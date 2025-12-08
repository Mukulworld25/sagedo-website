import express, { type Request, Response } from "express";
import { registerRoutes } from "../server/routes";

const app = express();

// 1. Setup Middleware
app.set('trust proxy', 1);
app.use(express.json({
  verify: (req: any, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

// 2. Logging
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      console.log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});

// 3. Lazy Route Registration
let routesRegistered = false;

export default async function handler(req: Request, res: Response) {
  if (!routesRegistered) {
    await registerRoutes(app);
    routesRegistered = true;
  }
  return app(req, res);
}
