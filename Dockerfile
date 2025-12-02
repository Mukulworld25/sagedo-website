# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-alpine AS base

LABEL fly_launch_runtime="Node.js/Express"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apk update && apk add --no-cache \
    python3 \
    make \
    g++ \
    libc6-compat

# Install node modules
COPY package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app/dist /app/dist
COPY --from=build /app/server /app/server
COPY --from=build /app/shared /app/shared
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/drizzle.config.ts /app/drizzle.config.ts

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000

CMD [ "node", "dist/index.js" ]
