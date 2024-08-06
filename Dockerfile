# Build Angular app
# Use latest node image
FROM node:latest as build
# Set working directory
WORKDIR /usr/src/app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy source code
COPY . .
# Build app
RUN npm run build

# Use nginx image
FROM nginx:latest
# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf
# Copy build artifacts
COPY --from=build /usr/src/app/dist/icon-generator /usr/share/nginx/html


