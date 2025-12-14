import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, registerCustomer, loginUser, isAuthenticated, isAdmin } from "./auth";
import { createPaymentOrder, verifyPaymentSignature } from "./payment";
import { sendOrderConfirmationEmail, sendPaymentSuccessEmail, sendOrderDeliveredEmail, sendAccountDeletionEmail } from "./email";
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

  // Request Password Reset (WhatsApp Flow)
  app.post('/api/auth/request-reset', async (req: any, res) => {
    try {
      const { email } = req.body;
      const user = await storage.getUserByEmail(email);

      if (!user) {
        // For security, don't reveal if email exists, but here we want to help legitimate users
        return res.status(404).json({ message: 'Email not found' });
      }

      // Construct WhatsApp message
      const message = `Hi, I need to reset my password for email: ${email}`;
      const whatsappLink = `https://wa.me/918264065662?text=${encodeURIComponent(message)}`;

      res.json({ success: true, whatsappLink });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
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
        loginCount: (user.loginCount || 0) + 1,
        lastLoginAt: new Date(),
      });

      req.session.user = {
        id: user.id,
        email: user.email,
        name: user.name || user.firstName,
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

  // Token routes (protected)
  app.post('/api/tokens/earn', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.user.id;
      const { amount, type, description } = req.body;

      if (!amount || !type || !description) {
        return res.status(400).json({ message: "Missing required fields" });
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
      const userId = req.session?.user?.id || `guest_${customerEmail}`;

      // Ensure user exists to satisfy foreign key constraint
      let user = await storage.getUser(userId);
      if (!user) {
        user = await storage.upsertUser({
          id: userId,
          email: customerEmail,
          name: customerName || "Guest User",
          picture: "",
          isAdmin: false,
          tokenBalance: 0,
          hasGoldenTicket: false,
          hasWelcomeBonus: false,
        });
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
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
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

  // Payment routes
  app.post('/api/payment/create-order', isAuthenticated, async (req, res) => {
    try {
      const { amount, orderId } = req.body;

      if (!amount || !orderId) {
        return res.status(400).json({ message: 'Amount and order ID required' });
      }

      const paymentOrder = await createPaymentOrder(amount, orderId);
      res.json(paymentOrder);
    } catch (error) {
      console.error("Error creating payment order:", error);
      res.status(500).json({ message: "Failed to create payment order" });
    }
  });

  app.post('/api/payment/verify', isAuthenticated, async (req, res) => {
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
            orderDate: order.createdAt.toLocaleDateString(),
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
          name: customer.name || customer.firstName,
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
      const { status, deliveryNotes } = req.body;

      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const order = await storage.updateOrderStatus(req.params.id, status, deliveryNotes);

      // Send delivery email when order is marked as delivered
      if (status === 'delivered') {
        await sendOrderDeliveredEmail({
          customerName: order.customerName || 'Customer',
          customerEmail: order.customerEmail,
          orderId: order.id,
          serviceName: order.serviceName,
          amount: order.amountPaid || 0,
          orderDate: order.createdAt.toLocaleDateString(),
          deliveryNotes: deliveryNotes
        });
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
        description: description || null,
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
        description: feedback.message,
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

  const httpServer = createServer(app);

  return httpServer;
}
