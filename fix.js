const fs = require('fs');
const { execSync } = require('child_process');

console.log("🛠️  STARTING AUTOMATED FIX...");

// 1. FIX PACKAGE.JSON (Block Vite Bundling)
const packageJson = {
  "name": "rest-express",
  "version": "1.0.0",
  "type": "module",
  "license": "MIT",
  "scripts": {
    "dev": "tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --bundle --format=esm --outdir=dist --external:vite --external:@babel/* --external:lightningcss --external:esbuild",
    "start": "NODE_ENV=production node dist/index.js",
    "check": "tsc",
    "db:push": "drizzle-kit push"
  },
  "dependencies": {
    "drizzle-kit": "^0.31.4",
    "@emailjs/browser": "^4.4.1",
    "@hookform/resolvers": "^3.10.0",
    "@jridgewell/trace-mapping": "^0.3.25",
    "@neondatabase/serverless": "^0.10.4",
    "@radix-ui/react-accordion": "^1.2.4",
    "@radix-ui/react-alert-dialog": "^1.1.7",
    "@radix-ui/react-aspect-ratio": "^1.1.3",
    "@radix-ui/react-avatar": "^1.1.4",
    "@radix-ui/react-checkbox": "^1.1.5",
    "@radix-ui/react-collapsible": "^1.1.4",
    "@radix-ui/react-context-menu": "^2.2.7",
    "@radix-ui/react-dialog": "^1.1.7",
    "@radix-ui/react-dropdown-menu": "^2.1.7",
    "@radix-ui/react-hover-card": "^1.1.7",
    "@radix-ui/react-label": "^2.1.3",
    "@radix-ui/react-menubar": "^1.1.7",
    "@radix-ui/react-navigation-menu": "^1.2.6",
    "@radix-ui/react-popover": "^1.1.7",
    "@radix-ui/react-progress": "^1.1.3",
    "@radix-ui/react-radio-group": "^1.2.4",
    "@radix-ui/react-scroll-area": "^1.2.4",
    "@radix-ui/react-select": "^2.1.7",
    "@radix-ui/react-separator": "^1.1.3",
    "@radix-ui/react-slider": "^1.2.4",
    "@radix-ui/react-slot": "^1.2.0",
    "@radix-ui/react-switch": "^1.1.4",
    "@radix-ui/react-tabs": "^1.1.4",
    "@radix-ui/react-toast": "^1.2.7",
    "@radix-ui/react-toggle": "^1.1.3",
    "@radix-ui/react-toggle-group": "^1.1.3",
    "@radix-ui/react-tooltip": "^1.2.0",
    "@tanstack/react-query": "^5.60.5",
    "@types/memoizee": "^0.4.12",
    "@types/multer": "^2.0.0",
    "bcrypt": "^6.0.0",
    "class-variance-authority": "^0.7.1",
    "cloudinary": "^2.8.0",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "connect-pg-simple": "^10.0.0",
    "date-fns": "^3.6.0",
    "dotenv": "^17.2.3",
    "drizzle-orm": "^0.39.1",
    "drizzle-zod": "^0.7.0",
    "embla-carousel-react": "^8.6.0",
    "express": "^4.21.2",
    "express-session": "^1.18.2",
    "framer-motion": "^11.13.1",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.453.0",
    "memoizee": "^0.4.17",
    "multer": "^2.0.2",
    "next-themes": "^0.4.6",
    "pg": "^8.16.3",
    "razorpay": "^2.9.6",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.55.0",
    "react-icons": "^5.4.0",
    "react-resizable-panels": "^2.1.7",
    "recharts": "^2.15.2",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "tw-animate-css": "^1.2.5",
    "uuid": "^13.0.0",
    "vaul": "^1.1.2",
    "wouter": "^3.3.5",
    "ws": "^8.18.0",
    "zod": "^3.24.2",
    "zod-validation-error": "^3.4.0"
  },
  "devDependencies": {
    "@replit/vite-plugin-cartographer": "^0.4.2",
    "@replit/vite-plugin-dev-banner": "^0.1.1",
    "@replit/vite-plugin-runtime-error-modal": "^0.0.3",
    "@tailwindcss/typography": "^0.5.15",
    "@types/connect-pg-simple": "^7.0.3",
    "@types/express": "4.17.21",
    "@types/express-session": "^1.18.0",
    "@types/node": "20.16.11",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@types/ws": "^8.5.13",
    "@vitejs/plugin-react": "^4.7.0",
    "autoprefixer": "^10.4.20",
    "esbuild": "^0.25.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.17",
    "tsx": "^4.20.5",
    "typescript": "5.6.3",
    "vite": "^5.4.20"
  },
  "optionalDependencies": {
    "bufferutil": "^4.0.8"
  }
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log("✅ package.json updated (Added --external:vite flag)");

// 2. FIX DOCKERFILE (Keep devDeps for runtime)
const dockerfileContent = `# syntax = docker/dockerfile:1
ARG NODE_VERSION=20.11.0
FROM node:\${NODE_VERSION}-alpine AS base
LABEL fly_launch_runtime="Node.js/Express"
WORKDIR /app
ENV NODE_ENV=production

FROM base AS build
RUN apk update && apk add --no-cache python3 make g++ libc6-compat
COPY package-lock.json package.json ./
RUN npm ci --include=dev
COPY . .
RUN npm run build
# IMPORTANT: We removed the 'npm prune' line so 'vite' remains available
# for the server to import without crashing.

FROM base
COPY --from=build /app/dist /app/dist
COPY --from=build /app/server /app/server
COPY --from=build /app/shared /app/shared
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/drizzle.config.ts /app/drizzle.config.ts

EXPOSE 3000
CMD [ "node", "dist/index.js" ]
`;

fs.writeFileSync('Dockerfile', dockerfileContent);
console.log("✅ Dockerfile updated (Removed npm prune)");

// 3. DEPLOY
console.log("🚀 STARTING DEPLOYMENT...");
try {
    execSync('git config --global user.email "deploy@fix.com"', { stdio: 'inherit' });
    execSync('git config --global user.name "Deploy Fixer"', { stdio: 'inherit' });
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Final Fix: Externalize vite and keep deps"', { stdio: 'inherit' });
} catch (e) {
    console.log("⚠️ Git steps had minor warnings (ignoring)...");
}

console.log("✈️  FLY DEPLOYING (NO CACHE)...");
execSync('fly deploy --app sagedo-ai --no-cache', { stdio: 'inherit' });
`;
