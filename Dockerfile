FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY build.js ./
COPY tsconfig.json ./
COPY .eslintrc.json ./
COPY mcp-specs.d.ts ./

# Create required directories
RUN mkdir -p bin dist

# Copy bin directory
COPY bin/ ./bin/

# Install dependencies (skip prepare script to avoid build errors)
RUN npm ci --ignore-scripts

# Copy source files
COPY src/ ./src/
COPY scripts/ ./scripts/

# Copy the OpenAPI spec
COPY todoist.yaml ./todoist.yaml

# Build the application manually
RUN node build.js && chmod +x bin/mcp-server.js

# Set environment variables with default values
ENV SERVER_NAME="todoist-mcp-server"
ENV SERVER_VERSION="1.0.0"
ENV OPENAPI_SPEC_PATH="./todoist.yaml"

# Expose port for Railway (though not actually needed since it's stdio-based)
EXPOSE 8080

# Start the MCP server
CMD ["node", "./bin/mcp-server.js"] 