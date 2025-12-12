# Deployment Guide for AgentChatWindow

This guide explains how to deploy the AgentChatWindow component so it can be accessed via URL from your agent.

## Quick Deploy Options

### Option 1: Vercel (Recommended - Free)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   cd agent-chat-widget
   vercel
   ```

3. Your component will be available at: `https://your-project.vercel.app`

### Option 2: Netlify (Free)

1. Install Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Build and deploy:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

### Option 3: GitHub Pages

1. Install `gh-pages`:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

4. Your component will be at: `https://Anshulsh123.github.io/agent-chat-widget`

## Using the Component via URL

Once deployed, you can pass data to the component via URL parameters:

### Method 1: Base64 Encoded JSON (Recommended for large data)

```
https://your-deployment-url.com?encoded=<base64-encoded-json>
```

Example:
```javascript
const data = {
  messages: [
    {
      id: "1",
      role: "agent",
      content: "Here's your data:",
      timestamp: "10:30 AM",
      tableHtml: "<table>...</table>",
      metadata: {
        canvasTitle: "Revenue Data"
      }
    }
  ]
};

const encoded = btoa(JSON.stringify(data));
const url = `https://your-deployment-url.com?encoded=${encodeURIComponent(encoded)}`;
```

### Method 2: Direct JSON (For smaller data)

```
https://your-deployment-url.com?data=<url-encoded-json>
```

Example:
```javascript
const data = { messages: [...] };
const url = `https://your-deployment-url.com?data=${encodeURIComponent(JSON.stringify(data))}`;
```

## Generating URLs

Use the helper script:

```bash
node generate-url.js agent-output-example.json
```

Or set the base URL:
```bash
COMPONENT_URL=https://your-deployment-url.com node generate-url.js agent-output-example.json
```

## Example Agent Integration

In your agent code, you can generate the URL like this:

```python
import json
import base64
from urllib.parse import quote

def generate_chat_url(messages, table_html=None, canvas_title="Data"):
    data = {
        "messages": messages,
        "initialState": {
            "isCanvasOpen": table_html is not None,
            "canvasTitle": canvas_title
        }
    }
    
    if table_html:
        # Add tableHtml to the last agent message
        if data["messages"] and data["messages"][-1]["role"] == "agent":
            data["messages"][-1]["tableHtml"] = table_html
            data["messages"][-1]["metadata"] = {"canvasTitle": canvas_title}
    
    # Encode as base64
    json_str = json.dumps(data)
    encoded = base64.b64encode(json_str.encode()).decode()
    
    base_url = "https://your-deployment-url.com"
    return f"{base_url}?encoded={quote(encoded)}"

# Usage
url = generate_chat_url(
    messages=[
        {
            "id": "1",
            "role": "agent",
            "content": "Here's the revenue data:",
            "timestamp": "10:30 AM"
        }
    ],
    table_html="<table><tr><th>Company</th><th>Revenue</th></tr><tr><td>Acme</td><td>$1.2M</td></tr></table>",
    canvas_title="Revenue Report"
)

print(f"Open this URL: {url}")
```

## Testing Locally

1. Start dev server:
   ```bash
   npm run dev
   ```

2. Test with URL:
   ```
   http://localhost:5173?encoded=<your-base64-encoded-json>
   ```

## Current Deployment Status

**⚠️ Component needs to be deployed to get a public URL.**

After deployment, update the `BASE_URL` in `generate-url.js` or set the `COMPONENT_URL` environment variable.
