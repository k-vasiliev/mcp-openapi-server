FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Set environment variables with default values
ENV SERVER_NAME="todoist-mcp-server"
ENV SERVER_VERSION="1.0.0"
ENV OPENAPI_SPEC_PATH="./todoist.yaml"

# Expose port for Railway (though not actually needed since it's stdio-based)
EXPOSE 8080

# Start the MCP server
CMD ["node", "./bin/mcp-server.js"] 