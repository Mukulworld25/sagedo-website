import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../server/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes once
let initialized = false;
const initPromise = (async () => {
  if (!initialized) {
    await registerRoutes(app);
    initialized = true;
  }
})();

// Vercel serverless handler
export default async (req: VercelRequest, res: VercelResponse) => {
  await initPromise;
  // @ts-ignore - Express and Vercel types are compatible at runtime
  return app(req, res);
};
```

---

## **VERCEL DASHBOARD SETTINGS:**

Go to: https://vercel.com/mukul-dhimans-projects/sagedo-website/settings/build-and-deployment

**Set Root Directory to:**
```
client
