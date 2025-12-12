# Table Viewer URL - Direct HTML Table Rendering

This URL directly renders your table HTML with formatting and styling - no React component, just a clean HTML page with the table.

## Base URL

```
https://cdn.jsdelivr.net/gh/Anshulsh123/agent-chat-widget@main/dist/table-viewer.html
```

## URL Format Options

### Method 1: Direct HTML (Simple)

```
https://cdn.jsdelivr.net/gh/Anshulsh123/agent-chat-widget@main/dist/table-viewer.html?html=<url-encoded-html>&title=<table-title>
```

### Method 2: Base64 JSON (Recommended - Cleaner URLs)

```
https://cdn.jsdelivr.net/gh/Anshulsh123/agent-chat-widget@main/dist/table-viewer.html?encoded=<base64-encoded-json>
```

## Python Function to Generate URL

```python
import json
import base64
from urllib.parse import quote

def get_table_url(table_html, title="Data Table", use_base64=True):
    """
    Generate URL for table viewer
    
    Args:
        table_html: HTML string of the table
        title: Title for the table page
        use_base64: If True, use base64 encoding (cleaner URL)
    
    Returns:
        Complete jsDelivr URL
    """
    base_url = "https://cdn.jsdelivr.net/gh/Anshulsh123/agent-chat-widget@main/dist/table-viewer.html"
    
    if use_base64:
        # Method 2: Base64 JSON (recommended)
        data = {
            "tableHtml": table_html,
            "title": title
        }
        json_str = json.dumps(data)
        encoded = base64.b64encode(json_str.encode()).decode()
        return f"{base_url}?encoded={quote(encoded)}"
    else:
        # Method 1: Direct HTML
        html_encoded = quote(table_html)
        title_encoded = quote(title)
        return f"{base_url}?html={html_encoded}&title={title_encoded}"

# Example usage
table_html = """
<table>
    <thead>
        <tr>
            <th>Company</th>
            <th>Revenue</th>
            <th>Growth</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Acme Corp</td>
            <td>$1,234,567</td>
            <td><span style="color: hsl(142 70% 50%)">+12.5%</span></td>
        </tr>
        <tr>
            <td>Globex Inc</td>
            <td>$892,341</td>
            <td><span style="color: hsl(142 70% 50%)">+8.2%</span></td>
        </tr>
    </tbody>
</table>
"""

url = get_table_url(table_html, title="Revenue Report")
print(f"Table URL: {url}")
```

## JavaScript/Node.js Function

```javascript
function getTableUrl(tableHtml, title = "Data Table", useBase64 = true) {
  const baseUrl = "https://cdn.jsdelivr.net/gh/Anshulsh123/agent-chat-widget@main/dist/table-viewer.html";
  
  if (useBase64) {
    // Method 2: Base64 JSON
    const data = {
      tableHtml: tableHtml,
      title: title
    };
    const jsonStr = JSON.stringify(data);
    const encoded = Buffer.from(jsonStr).toString('base64');
    return `${baseUrl}?encoded=${encodeURIComponent(encoded)}`;
  } else {
    // Method 1: Direct HTML
    const htmlEncoded = encodeURIComponent(tableHtml);
    const titleEncoded = encodeURIComponent(title);
    return `${baseUrl}?html=${htmlEncoded}&title=${titleEncoded}`;
  }
}

// Usage
const tableHtml = `
<table>
    <thead>
        <tr><th>Name</th><th>Value</th></tr>
    </thead>
    <tbody>
        <tr><td>Item 1</td><td>$100</td></tr>
        <tr><td>Item 2</td><td>$200</td></tr>
    </tbody>
</table>
`;

const url = getTableUrl(tableHtml, "Sales Data");
console.log(url);
```

## From Agent Message JSON

If you have the full agent message JSON (like from `agent-output-example.json`):

```python
import json
import base64
from urllib.parse import quote

def get_table_url_from_messages(messages_json, title=None):
    """
    Extract tableHtml from messages and generate URL
    
    Args:
        messages_json: List of message objects or full JSON with messages array
        title: Optional title (will use metadata.canvasTitle if available)
    
    Returns:
        Table viewer URL or None if no tableHtml found
    """
    # Handle both list and dict formats
    if isinstance(messages_json, dict) and 'messages' in messages_json:
        messages = messages_json['messages']
    elif isinstance(messages_json, list):
        messages = messages_json
    else:
        return None
    
    # Find last message with tableHtml
    table_html = None
    canvas_title = title or "Data Table"
    
    for msg in reversed(messages):
        if msg.get('tableHtml'):
            table_html = msg['tableHtml']
            if msg.get('metadata', {}).get('canvasTitle'):
                canvas_title = msg['metadata']['canvasTitle']
            break
    
    if not table_html:
        return None
    
    # Generate URL
    base_url = "https://cdn.jsdelivr.net/gh/Anshulsh123/agent-chat-widget@main/dist/table-viewer.html"
    data = {
        "tableHtml": table_html,
        "title": canvas_title
    }
    json_str = json.dumps(data)
    encoded = base64.b64encode(json_str.encode()).decode()
    return f"{base_url}?encoded={quote(encoded)}"

# Example: Load from JSON file
with open('agent-output-example.json', 'r') as f:
    data = json.load(f)

url = get_table_url_from_messages(data)
print(f"Table URL: {url}")
```

## Example Output

The URL will render a clean HTML page with:
- ✅ Professional table styling
- ✅ Responsive design
- ✅ Hover effects
- ✅ Preserved inline styles from your tableHtml
- ✅ Clean, readable layout

## Test the URL

You can test with this example URL:

```
https://cdn.jsdelivr.net/gh/Anshulsh123/agent-chat-widget@main/dist/table-viewer.html?encoded=eyJ0YWJsZUh0bWwiOiAiPHRhYmxlPjx0aGVhZD48dHI%2BPHRoPklEPC90aD48dGg%2BTmFtZTwvdGg%2BPHRoPlN0YXR1czwvdGg%2BPHRoPlJldmVudWU8L3RoPjx0aD5Hcm93dGg8L3RoPjwvdHI%2BPC90aGVhZD48dGJvZHk%2BPHRyPjx0ZD4jMDAxPC90ZD48dGQ%2BQWNtZSBDb3JwPC90ZD48dGQ%2BPHNwYW4gc3R5bGU9XCJjb2xvcjogaHNsKDE0MiA3MCUgNTAlKVwiPkFjdGl2ZTwvc3Bhbj48L3RkPjx0ZD4kMSwyMzQsNTY3PC90ZD48dGQ%2BKzEyLjUlPC90ZD48L3RyPjwvdGJvZHk%2BPC90YWJsZT4iLCAidGl0bGUiOiAiQ29tcGFueSBEYXRhIn0%3D
```

This will show a formatted table with all styling applied!
