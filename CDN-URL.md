# CDN URL for AgentChatWindow Component

## Main Component URL

The component is now available via jsDelivr CDN:

```
https://cdn.jsdelivr.net/gh/Anshulsh123/agent-chat-widget@main/dist/index.html
```

## Usage with Data

To pass data to the component, append URL parameters:

### Format:
```
https://cdn.jsdelivr.net/gh/Anshulsh123/agent-chat-widget@main/dist/index.html?encoded=<base64-encoded-json>
```

### Example URL Generation (Python):

```python
import json
import base64
from urllib.parse import quote

def generate_component_url(messages, table_html=None, canvas_title="Data"):
    """
    Generate jsDelivr URL for AgentChatWindow component
    
    Args:
        messages: List of message objects
        table_html: Optional HTML table content
        canvas_title: Title for canvas panel
    
    Returns:
        Complete jsDelivr URL with encoded data
    """
    base_url = "https://cdn.jsdelivr.net/gh/Anshulsh123/agent-chat-widget@main/dist/index.html"
    
    data = {
        "messages": messages,
        "initialState": {
            "isCanvasOpen": table_html is not None,
            "canvasTitle": canvas_title
        }
    }
    
    # Add tableHtml to last agent message
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
        <tr><th>Company</th><th>Revenue</th><th>Growth</th></tr>
    </thead>
    <tbody>
        <tr><td>Acme Corp</td><td>$1,234,567</td><td>+12.5%</td></tr>
        <tr><td>Globex Inc</td><td>$892,341</td><td>+8.2%</td></tr>
    </tbody>
</table>
"""

url = generate_component_url(
    messages=messages,
    table_html=table_html,
    canvas_title="Revenue Report"
)

print(f"Component URL: {url}")
```

### Example URL Generation (JavaScript/Node.js):

```javascript
function generateComponentUrl(messages, tableHtml = null, canvasTitle = "Data") {
  const baseUrl = "https://cdn.jsdelivr.net/gh/Anshulsh123/agent-chat-widget@main/dist/index.html";
  
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
const url = generateComponentUrl(
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

## Direct Access

You can also access the component without data (it will show default demo):

```
https://cdn.jsdelivr.net/gh/Anshulsh123/agent-chat-widget@main/dist/index.html
```

## Embedding in iframe

```html
<iframe 
  src="https://cdn.jsdelivr.net/gh/Anshulsh123/agent-chat-widget@main/dist/index.html?encoded=YOUR_ENCODED_DATA"
  width="100%"
  height="600px"
  frameborder="0">
</iframe>
```

## Updating the Component

To update the deployed version:
1. Make changes to the code
2. Run `npm run build`
3. Commit and push the `dist` folder:
   ```bash
   git add dist/
   git commit -m "Update component"
   git push
   ```
4. The jsDelivr URL will automatically serve the latest version (may take a few minutes to update)
