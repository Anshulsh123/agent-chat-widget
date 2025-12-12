# URL Usage for AgentChatWindow Component

## Current Status

⚠️ **The component needs to be deployed first to get a public URL.**

Once deployed, you can access it via URL with your data.

## Deployment Options

### Quick Deploy with Vercel (Recommended)

```bash
npm i -g vercel
cd agent-chat-widget
vercel
```

This will give you a URL like: `https://agent-chat-widget.vercel.app`

## Using the Component URL

### Format

```
https://your-deployment-url.com?encoded=<base64-encoded-json>
```

### Example: Generate URL from JSON

```bash
# Using the helper script
node generate-url.js agent-output-example.json

# Or set custom base URL
COMPONENT_URL=https://your-app.vercel.app node generate-url.js agent-output-example.json
```

### Example: Python Code to Generate URL

```python
import json
import base64
from urllib.parse import quote

def generate_chat_url(base_url, messages, table_html=None, canvas_title="Data"):
    """
    Generate a URL for the AgentChatWindow component
    
    Args:
        base_url: Your deployed component URL (e.g., "https://agent-chat-widget.vercel.app")
        messages: List of message objects
        table_html: Optional HTML table content
        canvas_title: Title for the canvas panel
    
    Returns:
        URL string with encoded data
    """
    data = {
        "messages": messages,
        "initialState": {
            "isCanvasOpen": table_html is not None,
            "canvasTitle": canvas_title
        }
    }
    
    # Add tableHtml to the last agent message if provided
    if table_html and data["messages"]:
        last_msg = data["messages"][-1]
        if last_msg.get("role") == "agent":
            last_msg["tableHtml"] = table_html
            last_msg["metadata"] = {"canvasTitle": canvas_title}
    
    # Encode as base64
    json_str = json.dumps(data)
    encoded = base64.b64encode(json_str.encode()).decode()
    
    return f"{base_url}?encoded={quote(encoded)}"

# Example usage
messages = [
    {
        "id": "1",
        "role": "agent",
        "content": "Here's the revenue data:",
        "timestamp": "10:30 AM"
    }
]

table_html = """
<table>
    <thead>
        <tr><th>Company</th><th>Revenue</th></tr>
    </thead>
    <tbody>
        <tr><td>Acme Corp</td><td>$1,234,567</td></tr>
        <tr><td>Globex Inc</td><td>$892,341</td></tr>
    </tbody>
</table>
"""

url = generate_chat_url(
    base_url="https://your-deployment-url.com",
    messages=messages,
    table_html=table_html,
    canvas_title="Revenue Report"
)

print(f"Open: {url}")
```

### Example: JavaScript/Node.js Code

```javascript
function generateChatUrl(baseUrl, messages, tableHtml = null, canvasTitle = "Data") {
  const data = {
    messages: messages,
    initialState: {
      isCanvasOpen: tableHtml !== null,
      canvasTitle: canvasTitle
    }
  };
  
  // Add tableHtml to last agent message
  if (tableHtml && data.messages.length > 0) {
    const lastMsg = data.messages[data.messages.length - 1];
    if (lastMsg.role === "agent") {
      lastMsg.tableHtml = tableHtml;
      lastMsg.metadata = { canvasTitle: canvasTitle };
    }
  }
  
  // Encode as base64
  const jsonStr = JSON.stringify(data);
  const encoded = Buffer.from(jsonStr).toString('base64');
  
  return `${baseUrl}?encoded=${encodeURIComponent(encoded)}`;
}

// Usage
const url = generateChatUrl(
  "https://your-deployment-url.com",
  [
    {
      id: "1",
      role: "agent",
      content: "Here's the data:",
      timestamp: "10:30 AM"
    }
  ],
  "<table><tr><th>Name</th><th>Value</th></tr><tr><td>Item</td><td>$100</td></tr></table>",
  "Sales Data"
);

console.log(url);
```

## Testing Locally

1. Start dev server:
   ```bash
   npm run dev
   ```

2. Generate a test URL:
   ```bash
   COMPONENT_URL=http://localhost:5173 node generate-url.js agent-output-example.json
   ```

3. Open the generated URL in your browser

## Next Steps

1. Deploy the component to get a public URL
2. Update the `BASE_URL` in your agent code
3. Use the URL generation functions above to create URLs with your data
