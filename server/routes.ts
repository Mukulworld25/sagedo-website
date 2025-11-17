import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated, isAdmin } from "./replitAuth";
import multer from "multer";

// Configure multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      // Check if user is authenticated
      if (!req.isAuthenticated() || !req.user?.claims?.sub) {
        return res.status(200).json(null);
      }
      
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Dashboard routes (protected)
  app.get('/api/dashboard/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      // Give welcome bonus if user hasn't received it yet
      if (user && !user.hasWelcomeBonus) {
        await storage.addTokenTransaction({
          userId: user.id,
          amount: 150,
          type: 'welcome',
          description: 'Welcome bonus',
        });
        // Update user to mark welcome bonus as given
        await storage.upsertUser({
          ...user,
          hasGoldenTicket: true,
          hasWelcomeBonus: true,
        });
        // Fetch updated user
        const updatedUser = await storage.getUser(userId);
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
      const userId = req.user.claims.sub;
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
      const userId = req.user.claims.sub;
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
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
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

  // Orders routes (protected)
  app.post('/api/orders', isAuthenticated, async (req: any, res) => {
    try {
      const { customerName, customerEmail, serviceName, requirements, fileUrls } = req.body;

      if (!customerEmail || !serviceName) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const userId = req.user.claims.sub;

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

      // TODO: Send email notification to admin
      console.log('New order created:', order.id);

      res.json(order);
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
      console.error("Error fetching gallery:", error);
      res.status(500).json({ message: "Failed to fetch gallery" });
    }
  });

  // File upload route
  app.post('/api/upload', upload.array('files', 10), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files provided" });
      }

      // TODO: Upload to Cloudinary or similar service
      // For now, return mock URLs
      const urls = files.map(file => `/uploads/${Date.now()}-${file.originalname}`);
      
      res.json({ urls });
    } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).json({ message: "Failed to upload files" });
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

  app.patch('/api/admin/orders/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { status, deliveryNotes } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const order = await storage.updateOrderStatus(req.params.id, status, deliveryNotes);
      res.json(order);
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ message: "Failed to update order" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
