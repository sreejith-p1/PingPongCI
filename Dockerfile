# Use Node.js for static server
FROM node:20-alpine AS build

WORKDIR /app

# Copy app files
COPY . .

# Install dependencies (if package.json exists)
RUN if [ -f package.json ]; then npm ci; fi

# Expose port for static server (e.g. 8080)
EXPOSE 8080

# Simple static server using http-server
RUN npm install -g http-server

CMD ["http-server", "-p", "8080"]