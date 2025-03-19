# Build aşaması
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Build application
RUN npm run build

# Çalıştırma aşaması - nginx ile servis ediyoruz
FROM nginx:alpine

# Copy build from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx config for SPA support
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"] 