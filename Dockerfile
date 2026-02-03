# Multi-stage build for Astro application
# Stage 1: Build the application
FROM oven/bun:1-debian AS builder

WORKDIR /app

# Set environment variables for build
ENV NODE_ENV=production
ENV ASTRO_TELEMETRY_DISABLED=1

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source files
COPY . .

# Accept build argument and build with it
ARG MAINTENANCE_MODE=false
RUN PUBLIC_MAINTENANCE_MODE=${MAINTENANCE_MODE} bun run build

# Stage 2: Production runtime with Nginx
FROM nginx:alpine AS runtime

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
