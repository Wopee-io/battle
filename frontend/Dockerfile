# Build stage
FROM node:24-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config template with dynamic BACKEND_URL
# nginx:alpine automatically processes /etc/nginx/templates/*.template files
# with envsubst at startup, outputting to /etc/nginx/conf.d/
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Only substitute BACKEND_URL, preserve nginx variables like $uri, $host
ENV NGINX_ENVSUBST_FILTER=BACKEND_URL

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
