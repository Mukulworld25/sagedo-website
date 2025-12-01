FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev deps needed for build)
RUN npm ci

# Copy all source code
COPY . .

# Build the app
RUN npm run build

# Remove dev dependencies after build (keeps image smaller)
RUN npm prune --production

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
