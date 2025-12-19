import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, registerCustomer, loginUser, isAuthenticated, isAdmin, generate2FASecret, generate2FAQRCode, verify2FAToken } from "./auth";
import { createPaymentOrder, verifyPaymentSignature } from "./payment";
import { sendOrderConfirmationEmail, sendPaymentSuccessEmail, sendOrderDeliveredEmail, sendAccountDeletionEmail, sendContactEmail } from "./email";
import { insertContactMessageSchema } from "@shared/schema";
import passport from 'passport';
import PDFDocument from 'pdfkit';
import multer from "multer";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // Auth routes

  // Customer Registration
  app.post('/api/auth/register', async (req: any, res) => {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ message: 'All fields required' });
      }

      const user = await registerCustomer(email, password, name);
      // Include ALL user fields in session, including welcome bonuses
      req.session.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: false,
        tokenBalance: user.tokenBalance,
        hasGoldenTicket: user.hasGoldenTicket,
        hasWelcomeBonus: user.hasWelcomeBonus,
      };

      res.json({ success: true, user: req.session.user });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });



  // Verify Email
  app.post('/api/auth/verify-email', async (req: any, res) => {
    try {
      const { token } = req.body;
      if (!token) return res.status(400).json({ message: 'Token required' });

      // Find user by token
      const user = await storage.getUserByVerificationToken(token);
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired verification token' });
      }

      // Verify
      await storage.verifyUserEmail(user.id);

      res.json({ success: true, message: 'Email verified successfully!' });
    } catch (error: any) {
      res.status(400).json({ message: 'Verification failed' });
    }
  });

  // Request Password Reset (Email Flow)
  app.post('/api/auth/request-reset', async (req: any, res) => {
    try {
      const { email } = req.body;
      const user = await storage.getUserByEmail(email);

      if (!user) {
        // For security, don't reveal if email exists
        return res.status(200).json({
          success: true,
          message: 'If this email exists, a reset link has been sent.'
        });
      }

      // Generate secure reset token (32 bytes = 64 hex chars)
      const crypto = await import('crypto');
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      // Store token in user record
      await storage.setResetToken(user.id, resetToken, resetTokenExpiry);

      // Send reset email
      const { sendPasswordResetEmail } = await import('./email');
      await sendPasswordResetEmail(email, user.name || 'User', resetToken);

      res.json({
        success: true,
        message: 'Password reset link sent to your email!'
      });
    } catch (error: any) {
      console.error('Password reset error:', error);
      res.status(500).json({ message: 'Failed to send reset email. Please try again.' });
    }
  });

  // Reset Password (with token)
  app.post('/api/auth/reset-password', async (req: any, res) => {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token and new password required' });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }

      // Find user by reset token
      const user = await storage.getUserByResetToken(token);

      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset link' });
      }

      // Check if token is expired
      if (user.resetTokenExpiry && new Date(user.resetTokenExpiry) < new Date()) {
        return res.status(400).json({ message: 'Reset link has expired. Please request a new one.' });
      }

      // Hash new password and update
      const bcrypt = await import('bcrypt');
      const passwordHash = await bcrypt.hash(newPassword, 10);
      await storage.updateUserPassword(user.id, passwordHash);

      // Clear reset token
      await storage.clearResetToken(user.id);

      res.json({ success: true, message: 'Password reset successfully!' });
    } catch (error: any) {
      console.error('Reset password error:', error);
      res.status(500).json({ message: 'Failed to reset password. Please try again.' });
    }
  });

  // Login (Customer or Admin)
  app.post('/api/auth/login', async (req: any, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' });
      }

      const user = await loginUser(email, password);

      // Update login stats
      await storage.upsertUser({
        ...user,
        loginCount: ((user as any).loginCount || 0) + 1,
        lastLoginAt: new Date(),
      });

      req.session.user = {
        id: user.id,
        email: user.email,
        name: user.name || (user as any).firstName,
        isAdmin: user.isAdmin,
        tokenBalance: user.tokenBalance || 0,
        hasGoldenTicket: user.hasGoldenTicket || false,
        hasWelcomeBonus: user.hasWelcomeBonus || false,
      };

      res.json({ success: true, user: req.session.user });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  });

  // Logout
  app.post('/api/auth/logout', (req: any, res) => {
    req.session.destroy((err: any) => {
      if (err) return res.status(500).json({ message: 'Logout failed' });
      res.json({ success: true });
    });
  });

  // Get Current User
  app.get('/api/auth/user', (req: any, res) => {
    res.json(req.session.user || null);
  });

  // Delete Account
  app.delete('/api/auth/account', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.user.id;
      const user = await storage.getUser(userId);

      if (user) {
        // Send confirmation email before deletion
        await sendAccountDeletionEmail(user.email, user.name || user.firstName || 'User');

        // Delete all user data
        await storage.deleteUser(userId);

        // Destroy session
        req.session.destroy();

        res.json({ success: true, message: 'Account deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      res.status(500).json({ message: 'Failed to delete account' });
    }
  });

  // Dashboard routes (protected)
  app.get('/api/dashboard/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.user.id;
      let user = await storage.getUser(userId);

      // Create user in database if they don't exist (from session-only login)
      if (!user) {
        user = await storage.upsertUser({
          id: userId,
          email: req.session.user.email,
          name: req.session.user.name,
          isAdmin: req.session.user.isAdmin || false,
          tokenBalance: 150,
          hasGoldenTicket: true,
          hasWelcomeBonus: true,
        });
        return res.json(user);
      }

      // Give welcome bonus if user hasn't received it yet
      if (!user.hasWelcomeBonus) {
        // Add token transaction
        await storage.addTokenTransaction({
          userId: user.id,
          amount: 150,
          type: 'welcome',
          description: 'Welcome bonus - FREE GPT + Golden Ticket',
        });
        // Update user with BOTH tokenBalance AND hasGoldenTicket
        const updatedUser = await storage.upsertUser({
          ...user,
          tokenBalance: (user.tokenBalance || 0) + 150,
          hasGoldenTicket: true,
          hasWelcomeBonus: true,
        });
        return res.json(updatedUser);
      }

      res.json(user);
    } catch (error) {
      console.error("Error fetching dashboard user:", error);
      res.status(500).json({ message: "Failed to fetch user data" });
    }
  });

  app.get('/api/dashboard/orders', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.user.id;
      const orders = await storage.getOrdersByUserId(userId);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  // Token routes (protected) - with validation to prevent abuse
  app.post('/api/tokens/earn', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.user.id;
      const { amount, type, description, referralEmail } = req.body;

      if (!amount || !type || !description) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Get user to check eligibility
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Validation based on token type
      if (type === 'daily_login') {
        // Check if already claimed today
        const today = new Date().toDateString();
        const lastLogin = user.lastLoginAt ? new Date(user.lastLoginAt).toDateString() : null;

        if (lastLogin === today) {
          return res.status(400).json({ message: "Daily bonus already claimed today! Come back tomorrow." });
        }

        // Update last login date
        await storage.updateUserLastLogin(userId);
      }
      else if (type === 'referral') {
        // Require referral email
        if (!referralEmail || !referralEmail.includes('@')) {
          return res.status(400).json({ message: "Please enter a valid email for the person you referred." });
        }

        // Check if same as user's email
        if (referralEmail.toLowerCase() === user.email.toLowerCase()) {
          return res.status(400).json({ message: "You cannot refer yourself!" });
        }

        // Check if already referred this email
        const existingReferral = await storage.checkReferral(userId, referralEmail);
        if (existingReferral) {
          return res.status(400).json({ message: "You have already claimed a referral bonus for this email." });
        }

        // Store referral
        await storage.addReferral(userId, referralEmail);
      }
      else if (type === 'survey') {
        // Check if survey already completed today
        const today = new Date().toDateString();
        const existingSurvey = await storage.getLastTokenTransactionByType(userId, 'survey');
        if (existingSurvey) {
          const surveyDate = new Date(existingSurvey.createdAt!).toDateString();
          if (surveyDate === today) {
            return res.status(400).json({ message: "Survey already completed today! Try again tomorrow." });
          }
        }
      }

      const transaction = await storage.addTokenTransaction({
        userId,
        amount,
        type,
        description,
      });

      res.json(transaction);
    } catch (error) {
      console.error("Error earning tokens:", error);
      res.status(500).json({ message: "Failed to earn tokens" });
    }
  });

  // Services routes (public)
  app.get('/api/test-email', async (req, res) => {
    const toEmail = (req.query.to as string) || "mukul@sagedo.in";

    // Resend config diagnostics
    const diagnostics: any = {
      timestamp: new Date().toISOString(),
      emailProvider: 'Resend',
      resendApiKeySet: !!process.env.RESEND_API_KEY,
      resendApiKeyLength: process.env.RESEND_API_KEY?.length || 0,
      targetEmail: toEmail,
    };

    // If ?send=true, actually try to send
    if (req.query.send === 'true') {
      try {
        await sendOrderConfirmationEmail({
          customerName: "Test User",
          customerEmail: toEmail,
          orderId: "TEST-" + Date.now(),
          serviceName: "Email System Test",
          amount: 0,
          orderDate: new Date().toLocaleDateString(),
          isFree: true
        });
        diagnostics.emailSent = true;
        diagnostics.success = true;
      } catch (error: any) {
        diagnostics.emailSent = false;
        diagnostics.success = false;
        diagnostics.errorMessage = error.message;
      }
    }

    res.json(diagnostics);
  });

  app.get('/api/services', async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      console.warn("Database not configured - returning empty services");
      res.json([]);
    }
  });

  app.get('/api/services/:id', async (req, res) => {
    try {
      const service = await storage.getServiceById(req.params.id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });
  // Orders routes (now public - no auth required)
  app.post('/api/orders', async (req: any, res) => {
    try {
      const { customerName, customerEmail, serviceName, requirements, fileUrls } = req.body;

      if (!customerEmail || !serviceName) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Use session user if logged in, otherwise create guest userId
      let userId = req.session?.user?.id;

      // Ensure user exists to satisfy foreign key constraint
      // If logged in, always use session user ID
      if (userId && userId !== 'admin') {
        // User is logged in - use their session ID directly
        // No need to lookup or create
      } else if (!userId) {
        // Not logged in - check if user exists by email or create guest
        let user = await storage.getUserByEmail(customerEmail);
        if (user) {
          userId = user.id; // Use existing user's ID
        } else {
          // Create guest user
          userId = `guest_${Date.now()}_${Math.random().toString(36).slice(2)}`;
          await storage.upsertUser({
            id: userId,
            email: customerEmail,
            name: customerName || "Guest User",
            profileImageUrl: "",
            isAdmin: false,
            tokenBalance: 0,
            hasGoldenTicket: false,
            hasWelcomeBonus: false,
          });
        }
      } else if (userId === 'admin') {
        // Admin placing order - create as guest or find existing user
        let user = await storage.getUserByEmail(customerEmail);
        if (user) {
          userId = user.id;
        } else {
          userId = `guest_${Date.now()}_${Math.random().toString(36).slice(2)}`;
          await storage.upsertUser({
            id: userId,
            email: customerEmail,
            name: customerName || "Guest User",
            profileImageUrl: "",
            isAdmin: false,
            tokenBalance: 0,
            hasGoldenTicket: false,
            hasWelcomeBonus: false,
          });
        }
      }

      const order = await storage.createOrder({
        userId,
        serviceId: 'custom',
        serviceName,
        customerEmail,
        customerName: customerName || null,
        requirements: requirements || null,
        fileUrls: fileUrls || [],
        status: 'pending',
        paidWithTokens: false,
        paidWithGolden: false,
        amountPaid: 0,
      });

      // Order created successfully
      console.log('New order created:', order.id);

      // Send response immediately (don't wait for email)
      res.json(order);

      // Send order confirmation email in background (fire-and-forget)
      sendOrderConfirmationEmail({
        customerName: customerName || 'Customer',
        customerEmail,
        orderId: order.id,
        serviceName,
        amount: 0, // Amount will be set after payment
        orderDate: new Date().toLocaleDateString('en-IN'),
      }).catch(err => console.error('Email failed (background):', err));
    } catch (error: any) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order", error: error?.message || String(error) });
    }
  });

  // Admin Order Routes
  app.get('/api/admin/orders', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching admin orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.patch('/api/admin/orders/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { status, deliveryNotes } = req.body;
      if (!status) return res.status(400).json({ message: "Status required" });

      const order = await storage.updateOrderStatus(req.params.id, status, deliveryNotes);

      // Send email notification when order is delivered
      if (status === 'delivered' && order) {
        sendOrderDeliveredEmail({
          customerName: order.customerName || 'Customer',
          customerEmail: order.customerEmail,
          orderId: order.id,
          serviceName: order.serviceName,
          amount: order.amountPaid || 0,
          orderDate: new Date(order.createdAt!).toLocaleDateString('en-IN'),
          deliveryNotes: deliveryNotes,
        }).catch(err => console.error('Delivery email failed:', err));
      }

      res.json(order);
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ message: "Failed to update order" });
    }
  });

  app.get('/api/orders/:id', async (req, res) => {
    try {
      const order = await storage.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  // Gallery routes (public)
  app.get('/api/gallery', async (req, res) => {
    try {
      const items = await storage.getVisibleGalleryItems();
      res.json(items);
    } catch (error) {
      console.warn("Database not configured - returning empty gallery");
      res.json([]);
    }
  });

  // File upload route - Now using Supabase Storage
  app.post('/api/upload', upload.array('files', 10), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files provided" });
      }

      // Check if Supabase is configured (we need at least URL, key might be optional if public but good practice)
      if (!process.env.SUPABASE_URL) {
        console.warn("Supabase not fully configured - returning mock URLs");
        const urls = files.map(file => `/uploads/${Date.now()}-${file.originalname}`);
        return res.json({ urls });
      }

      // Upload to Supabase Storage
      const { uploadMultipleToSupabase } = await import('./supabase');
      const uploadData = files.map(file => ({
        buffer: file.buffer,
        originalName: file.originalname,
      }));

      const results = await uploadMultipleToSupabase(uploadData);
      const urls = results.map(r => r.url);

      console.log('Files uploaded to Supabase:', urls);
      res.json({ urls });
    } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).json({ message: "Failed to upload files" });
    }
  });

  // Payment routes (no auth required - order creation validates user)
  app.post('/api/payment/create-order', async (req, res) => {
    try {
      const { amount, orderId } = req.body;

      if (!amount || !orderId) {
        return res.status(400).json({ message: 'Amount and order ID required' });
      }

      // Check if Razorpay is configured
      if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        console.error('Razorpay not configured: Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET');
        return res.status(500).json({ message: 'Payment gateway not configured' });
      }

      console.log(`Creating Razorpay order: amount=${amount}, orderId=${orderId}`);
      const paymentOrder = await createPaymentOrder(amount, orderId);
      console.log('Razorpay order created:', paymentOrder.id);
      res.json(paymentOrder);
    } catch (error: any) {
      console.error("Error creating payment order:", error);
      console.error("Razorpay error details:", error?.error || error?.message || error);
      res.status(500).json({
        message: "Failed to create payment order",
        error: error?.error?.description || error?.message || 'Unknown error'
      });
    }
  });

  app.post('/api/payment/verify', async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
        return res.status(400).json({ message: 'Missing payment verification data' });
      }

      const isValid = verifyPaymentSignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );

      if (isValid) {
        // Update order as paid
        const order = await storage.getOrderById(orderId);
        if (order) {
          await storage.updateOrderStatus(orderId, 'processing');
        }

        // Send response immediately (don't wait for email)
        res.json({ success: true, message: 'Payment verified successfully' });

        // Send payment success email in background (fire-and-forget)
        if (order) {
          sendPaymentSuccessEmail({
            customerName: order.customerName || 'Customer',
            customerEmail: order.customerEmail,
            orderId: order.id,
            serviceName: order.serviceName,
            amount: order.amountPaid || 0,
            orderDate: (order.createdAt || new Date()).toLocaleDateString(),
            paymentId: razorpay_payment_id,
            paymentMethod: 'Razorpay'
          }).catch(err => console.error('Payment email failed (background):', err));
        }
      } else {
        res.status(400).json({ success: false, message: 'Invalid payment signature' });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ message: "Payment verification failed" });
    }
  });

  // Admin routes (protected with admin role check)
  app.get('/api/admin/orders', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching admin orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  // Get single order details (for admin order detail view)
  app.get('/api/admin/orders/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const order = await storage.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Get customer info if userId exists
      let customer = null;
      if (order.userId) {
        customer = await storage.getUser(order.userId);
      }

      res.json({
        ...order,
        customer: customer ? {
          id: customer.id,
          name: customer.name || (customer as any).firstName,
          email: customer.email,
          tokenBalance: customer.tokenBalance,
          hasGoldenTicket: customer.hasGoldenTicket,
        } : null
      });
    } catch (error) {
      console.error("Error fetching order details:", error);
      res.status(500).json({ message: "Failed to fetch order details" });
    }
  });
  app.patch('/api/admin/orders/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { status, deliveryNotes, deliveryFileUrls } = req.body;

      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const order = await storage.updateOrderStatus(req.params.id, status, deliveryNotes, deliveryFileUrls);

      // Send delivery email when order is marked as delivered
      if (status === 'delivered') {
        // Check customer's delivery preference
        const fullOrder = await storage.getOrderById(req.params.id);
        const shouldEmail = fullOrder?.deliveryPreference === 'email' || deliveryFileUrls?.length > 0;

        if (shouldEmail) {
          await sendOrderDeliveredEmail({
            customerName: order.customerName || 'Customer',
            customerEmail: order.customerEmail,
            orderId: order.id,
            serviceName: order.serviceName,
            amount: order.amountPaid || 0,
            orderDate: (order.createdAt || new Date()).toLocaleDateString(),
            deliveryNotes: deliveryNotes,
            deliveryFileUrls: deliveryFileUrls || []
          });
        }
      }

      res.json(order);
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ message: "Failed to update order" });
    }
  });

  app.get('/api/admin/stats', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Analytics routes
  app.post('/api/track-visit', async (req, res) => {
    try {
      const ip = req.ip || req.connection.remoteAddress;
      const userAgent = req.headers['user-agent'];
      const path = req.body.path || '/';

      await storage.logVisit({
        ipHash: ip ? Buffer.from(ip).toString('base64') : 'unknown', // Simple hashing
        userAgent: userAgent || 'unknown',
        path,
      });

      res.json({ success: true });
    } catch (error) {
      // Don't fail the request if tracking fails
      console.error("Error tracking visit:", error);
      res.json({ success: false });
    }
  });

  app.post('/api/services/:id/click', async (req, res) => {
    try {
      await storage.incrementServiceClick(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error tracking service click:", error);
      res.status(500).json({ message: "Failed to track click" });
    }
  });

  // Feedback routes
  app.post('/api/feedback', async (req: any, res) => {
    try {
      const { message, rating } = req.body;
      const userId = req.user?.claims?.sub || req.session?.user?.id; // Optional user ID

      if (!message) {
        return res.status(400).json({ message: "Message is required" });
      }

      const feedback = await storage.createFeedback({
        message,
        rating: rating || null,
        userId: userId || null,
      });

      res.json(feedback);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      res.status(500).json({ message: "Failed to submit feedback" });
    }
  });

  app.get('/api/admin/feedback', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const feedbacks = await storage.getAllFeedbacks();
      res.json(feedbacks);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      res.status(500).json({ message: "Failed to fetch feedback" });
    }
  });

  // Gallery routes (public)
  app.get('/api/gallery', async (req, res) => {
    try {
      const items = await storage.getVisibleGalleryItems();
      res.json(items);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      res.status(500).json({ message: "Failed to fetch gallery" });
    }
  });

  // Admin Gallery routes
  app.post('/api/admin/gallery', isAuthenticated, isAdmin, upload.single('image'), async (req: any, res) => {
    try {
      const { title, description, type, clientName, clientRole, rating } = req.body;

      if (!title || !type) {
        return res.status(400).json({ message: "Title and type are required" });
      }

      // If image uploaded, you would handle it here (e.g., upload to cloud storage)
      // For now, we'll store image URL if provided
      const imageUrl = req.body.imageUrl || null;

      const item = await storage.createGalleryItem({
        title,
        content: description || null,
        imageUrl,
        type, // 'work_showcase' or 'testimonial'
        clientName: clientName || null,
        clientRole: clientRole || null,
        rating: rating ? parseInt(rating) : null,
        isVisible: true,
      });

      res.json(item);
    } catch (error) {
      console.error("Error creating gallery item:", error);
      res.status(500).json({ message: "Failed to create gallery item" });
    }
  });

  // Approve feedback as testimonial (adds to gallery)
  app.post('/api/admin/feedback/:id/approve', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { clientName, clientRole } = req.body;
      const feedbackId = req.params.id;

      // Get the feedback
      const feedbacks = await storage.getAllFeedbacks();
      const feedback = feedbacks.find(f => f.id === feedbackId);

      if (!feedback) {
        return res.status(404).json({ message: "Feedback not found" });
      }

      // Create a testimonial gallery item from feedback
      const item = await storage.createGalleryItem({
        title: "Client Testimonial",
        content: feedback.message,
        imageUrl: null,
        type: 'testimonial',
        clientName: clientName || 'Anonymous User',
        clientRole: clientRole || 'SAGE DO User',
        rating: feedback.rating,
        isVisible: true,
      });

      res.json({ success: true, testimonial: item });
    } catch (error) {
      console.error("Error approving feedback:", error);
      res.status(500).json({ message: "Failed to approve feedback" });
    }
  });

  // Admin: Reset all data (DANGEROUS - requires secret key)
  app.post('/api/admin/reset-database', async (req: any, res) => {
    try {
      const { secretKey } = req.body;

      // Verify secret key matches admin password or special reset key
      if (secretKey !== process.env.ADMIN_RESET_KEY && secretKey !== 'SAGEDO_RESET_2024') {
        return res.status(403).json({ message: 'Invalid reset key' });
      }

      // Import db directly for raw queries
      const { db } = await import('./db');
      const { sql } = await import('drizzle-orm');

      // Clear all tables in order (respecting foreign keys)
      await db.execute(sql`TRUNCATE TABLE token_transactions CASCADE`);
      await db.execute(sql`TRUNCATE TABLE orders CASCADE`);
      await db.execute(sql`TRUNCATE TABLE sessions CASCADE`);
      await db.execute(sql`TRUNCATE TABLE feedback CASCADE`);
      await db.execute(sql`TRUNCATE TABLE gallery CASCADE`);
      await db.execute(sql`TRUNCATE TABLE users CASCADE`);

      console.log('⚠️ DATABASE RESET: All data cleared by admin');

      res.json({
        success: true,
        message: 'All data has been cleared. All users must create new accounts.'
      });
    } catch (error) {
      console.error("Error resetting database:", error);
      res.status(500).json({ message: "Failed to reset database" });
    }
  });

  // Newsletter subscription (public)
  app.post('/api/newsletter', async (req, res) => {
    try {
      const { email } = req.body;

      if (!email || !email.includes('@')) {
        return res.status(400).json({ message: 'Valid email required' });
      }

      // Log the subscription (you could also save to DB)
      console.log('📧 Newsletter subscription:', email);

      // For now, just log it. Could be extended to save to a newsletters table
      res.json({ success: true, message: 'Subscribed successfully!' });
    } catch (error) {
      console.error('Newsletter error:', error);
      res.status(500).json({ message: 'Failed to subscribe' });
    }
  });

  // Contact Form
  app.post('/api/contact', async (req, res) => {
    try {
      const data = insertContactMessageSchema.parse(req.body);

      // Save to DB
      const message = await storage.createContactMessage(data);

      // Send email to admin
      await sendContactEmail(data.name, data.email, data.subject, data.message);

      res.json(message);
    } catch (error: any) {
      console.error('Contact form error:', error);
      res.status(400).json({ message: error.message || 'Failed to send message' });
    }
  });

  // Social Login Routes (with graceful error handling)
  app.get('/api/auth/google', (req, res, next) => {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      return res.status(503).json({
        message: 'Google login is not configured. Please use email/password login or contact support.'
      });
    }
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  });

  app.get('/api/auth/google/callback',
    (req, res, next) => {
      if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        return res.redirect('/login?error=google_not_configured');
      }
      passport.authenticate('google', { failureRedirect: '/login?error=google_failed' })(req, res, next);
    },
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  app.get('/api/auth/github', (req, res, next) => {
    if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
      return res.status(503).json({
        message: 'GitHub login is not configured. Please use email/password login or contact support.'
      });
    }
    passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
  });

  app.get('/api/auth/github/callback',
    (req, res, next) => {
      if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
        return res.redirect('/login?error=github_not_configured');
      }
      passport.authenticate('github', { failureRedirect: '/login?error=github_failed' })(req, res, next);
    },
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  // 2FA Routes
  app.post('/api/auth/2fa/setup', async (req: any, res) => {
    if (!req.user) return res.status(401).send('Unauthorized');

    const secret = generate2FASecret();
    const qrCode = await generate2FAQRCode(req.user.email, secret);

    // Ideally store secret temporarily in session until verified, but for simplicity saving to user pending verify or just handling in frontend
    req.session.temp2faSecret = secret;

    res.json({ secret, qrCode });
  });

  app.post('/api/auth/2fa/enable', async (req: any, res) => {
    if (!req.user || !req.session.temp2faSecret) return res.status(401).send('Unauthorized');

    const { token } = req.body;
    const verified = verify2FAToken(token, req.session.temp2faSecret);

    if (verified) {
      await storage.upsertUser({
        ...req.user,
        isTwoFactorEnabled: true,
        twoFactorSecret: req.session.temp2faSecret
      } as any);
      delete req.session.temp2faSecret;
      res.json({ success: true });
    } else {
      res.status(400).json({ message: 'Invalid token' });
    }
  });

  // 2FA Disable Route
  app.post('/api/auth/2fa/disable', async (req: any, res) => {
    if (!req.user) return res.status(401).send('Unauthorized');

    try {
      await storage.upsertUser({
        ...req.user,
        isTwoFactorEnabled: false,
        twoFactorSecret: null
      } as any);

      // Update session user
      req.user.isTwoFactorEnabled = false;
      req.user.twoFactorSecret = null;

      res.json({ success: true, message: '2FA disabled successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to disable 2FA' });
    }
  });

  // Invoice Route
  app.get('/api/orders/:id/invoice', async (req: any, res) => {
    if (!req.user) return res.status(401).send('Unauthorized');

    const order = await storage.getOrderById(req.params.id);
    if (!order) return res.status(404).send('Order not found');

    // Check ownership
    if (!req.user.isAdmin && order.userId !== req.user.id) {
      return res.status(403).send('Forbidden');
    }

    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${order.id}.pdf`);

    doc.pipe(res);

    doc.fontSize(25).text('Invoice', 50, 57);
    doc.fontSize(10).text(`Invoice Number: ${order.id}`, 200, 65, { align: 'right' });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 200, 80, { align: 'right' });
    doc.moveDown();

    doc.fontSize(12).text(`Customer: ${req.user.name}`, 50, 150);

    // Table Header
    doc.fontSize(10).text('Service', 50, 180).text('Price', 400, 180, { width: 100, align: 'right' });
    doc.moveTo(50, 195).lineTo(500, 195).stroke();

    // Table Row
    doc.fontSize(10).text(order.serviceName, 50, 210).text((order.amountPaid || 0).toString(), 400, 210, { width: 100, align: 'right' });

    doc.moveDown(4);
    doc.fontSize(14).text('Thank you for your business!', { align: 'center' });

    doc.end();
  });

  const httpServer = createServer(app);

  return httpServer;
}
