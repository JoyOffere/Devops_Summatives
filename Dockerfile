# Multi-stage Dockerfile for Azure deployment
# This builds both frontend and backend in a single container

# Frontend build stage
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Backend build stage
FROM node:18-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ ./

# Final production stage
FROM node:18-alpine AS production
WORKDIR /app

# Install nginx to serve static files
RUN apk add --no-cache nginx

# Copy backend
COPY --from=backend-builder /app/backend ./backend
WORKDIR /app/backend

# Copy frontend build to nginx directory
COPY --from=frontend-builder /app/frontend/build /usr/share/nginx/html

# Create nginx configuration
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    location /api { \
        proxy_pass http://localhost:5000; \
        proxy_http_version 1.1; \
        proxy_set_header Upgrade $http_upgrade; \
        proxy_set_header Connection "upgrade"; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
        proxy_set_header X-Forwarded-Proto $scheme; \
    } \
}' > /etc/nginx/http.d/default.conf

# Create startup script
RUN echo '#!/bin/sh \
nginx & \
cd /app/backend && node src/index.js' > /start.sh && chmod +x /start.sh

# Environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port 80 for Azure App Service
EXPOSE 80

# Start both nginx and Node.js backend
CMD ["/start.sh"]
