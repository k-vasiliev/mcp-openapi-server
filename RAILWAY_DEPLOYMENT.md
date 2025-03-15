# Deploying Todoist MCP Server on Railway

This guide walks through the process of deploying the OpenAPI MCP Server with Todoist integration on Railway.

## Prerequisites

1. A Railway account (https://railway.app)
2. Railway CLI installed (optional, for local deployment)
3. Todoist API token (https://todoist.com/help/articles/find-your-api-token-9YA6zlvd)

## Deployment Steps

### Option 1: Deploy via Railway Dashboard

1. Fork or clone this repository to your GitHub account
2. In Railway dashboard, create a new project and select "Deploy from GitHub repo"
3. Connect your GitHub account and select the repository
4. Configure the following environment variables in the Railway dashboard:
   - `API_BASE_URL` = `https://api.todoist.com/rest/v2`
   - `OPENAPI_SPEC_PATH` = `./todoist.yaml`
   - `API_HEADERS` = `Authorization:Bearer YOUR_TODOIST_API_TOKEN`
   - `SERVER_NAME` = `todoist-mcp-server` (or your preferred name)
   - `SERVER_VERSION` = `1.0.0`
5. Railway will automatically detect the Dockerfile and deploy your application

### Option 2: Deploy via Railway CLI

1. Login to Railway CLI:
   ```bash
   railway login
   ```

2. Initialize the project:
   ```bash
   railway init
   ```

3. Create a .env file with your configuration:
   ```bash
   cp .env.example .env
   # Edit .env with your Todoist API token
   ```

4. Deploy your project:
   ```bash
   railway up
   ```

5. Set up environment variables:
   ```bash
   railway variables set API_BASE_URL=https://api.todoist.com/rest/v2 OPENAPI_SPEC_PATH=./todoist.yaml API_HEADERS="Authorization:Bearer YOUR_TODOIST_API_TOKEN" SERVER_NAME=todoist-mcp-server SERVER_VERSION=1.0.0
   ```

## Connecting to Claude

Once deployed, you'll need to configure Claude to use your deployed MCP server:

1. Get your Railway service URL from the Railway dashboard
2. Update your Claude Desktop configuration file:
   - On macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

3. Add the following configuration:

```json
{
  "mcpServers": {
    "todoist": {
      "url": "https://your-railway-deployment-url",
      "env": {}
    }
  }
}
```

## Troubleshooting

- Check Railway logs for any errors
- Verify your Todoist API token is valid
- Ensure the todoist.yaml OpenAPI specification is correctly formatted 