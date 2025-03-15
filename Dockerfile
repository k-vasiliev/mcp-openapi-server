FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY build.js ./
COPY tsconfig.json ./
COPY .eslintrc.json ./
COPY mcp-specs.d.ts ./
COPY fix-yargs.js ./

# Create required directories
RUN mkdir -p bin dist

# Copy bin directory
COPY bin/ ./bin/

# Install dependencies (using install instead of ci to handle new dependencies)
RUN npm install --ignore-scripts

# Copy source files
COPY src/ ./src/
COPY scripts/ ./scripts/

# Copy the OpenAPI spec (JSON version)
COPY todoist.json ./todoist.json

# Build the application manually
RUN node build.js && chmod +x bin/mcp-server.js

# Patch the bundle to fix the yargs issue
RUN node fix-yargs.js

# Set environment variables with default values
ENV SERVER_NAME="todoist-mcp-server"
ENV SERVER_VERSION="1.0.0"
ENV OPENAPI_SPEC_PATH="./todoist.json"
ENV API_BASE_URL="https://api.todoist.com/rest/v2"

# Expose port for Railway (though not actually needed since it's stdio-based)
EXPOSE 8080

# Start the MCP server with explicit parameters (using srv-version to avoid yargs warning)
CMD ["node", "./bin/mcp-server.js", "--api-base-url", "https://api.todoist.com/rest/v2", "--openapi-spec", "./todoist.json", "--name", "todoist-mcp-server", "--srv-version", "1.0.0"] 