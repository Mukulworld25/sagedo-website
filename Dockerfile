FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY drizzle.config.ts ./

# Install ALL dependencies (including devDependencies for building)
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 expressjs && \
    adduser --system --uid 1001 expressjs

# Copy built application from builder
COPY --from=builder --chown=expressjs:expressjs /app/dist ./dist
COPY --from=builder --chown=expressjs:expressjs /app/server ./server
COPY --from=builder --chown=expressjs:expressjs /app/node_modules ./node_modules
COPY --from=builder --chown=expressjs:expressjs /app/shared ./shared
COPY --from=builder --chown=expressjs:expressjs /app/package.json ./
COPY --from=builder --chown=expressjs:expressjs /app/drizzle.config.ts ./

# Switch to non-root user
USER expressjs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if(r.statusCode !== 200) process.exit(1)})" || exit 1

EXPOSE 3000

CMD ["node", "dist/index.js"]
