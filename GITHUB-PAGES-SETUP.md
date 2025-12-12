# GitHub Pages Setup Instructions

## Step 1: Enable GitHub Pages

1. Go to your repository: https://github.com/Anshulsh123/agent-chat-widget
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - **Branch**: `main`
   - **Folder**: `/docs`
5. Click **Save**

## Step 2: Wait for Deployment

GitHub Pages will build and deploy your site. This usually takes 1-2 minutes.

## Step 3: Access Your Table Viewer

Once deployed, your table viewer will be available at:

```
https://anshulsh123.github.io/agent-chat-widget/?encoded=<base64-json>
```

## Example URL

After enabling GitHub Pages, you can use:

```
https://anshulsh123.github.io/agent-chat-widget/?encoded=eyJ0YWJsZUh0bWwiOiAiPHRhYmxlPjx0aGVhZD48dHI%2BPHRoPklEPC90aD48dGg%2BTmFtZTwvdGg%2BPHRoPlN0YXR1czwvdGg%2BPHRoPlJldmVudWU8L3RoPjx0aD5Hcm93dGg8L3RoPjwvdHI%2BPC90aGVhZD48dGJvZHk%2BPHRyPjx0ZD4jMDAxPC90ZD48dGQ%2BQWNtZSBDb3JwPC90ZD48dGQ%2BPHNwYW4gc3R5bGU9XCJjb2xvcjogaHNsKDE0MiA3MCUgNTAlKVwiPkFjdGl2ZTwvc3Bhbj48L3RkPjx0ZD4kMSwyMzQsNTY3PC90ZD48dGQ%2BKzEyLjUlPC90ZD48L3RyPjwvdGJvZHk%2BPC90YWJsZT4iLCAidGl0bGUiOiAiQ29tcGFueSBEYXRhIn0%3D
```

## Python Function (Updated for GitHub Pages)

```python
import json
import base64
from urllib.parse import quote

def get_table_url(table_html, title="Data Table"):
    """Generate GitHub Pages URL for table viewer"""
    base_url = "https://anshulsh123.github.io/agent-chat-widget"
    
    data = {
        "tableHtml": table_html,
        "title": title
    }
    json_str = json.dumps(data)
    encoded = base64.b64encode(json_str.encode()).decode()
    return f"{base_url}/?encoded={quote(encoded)}"

# Usage
table_html = """
<table>
    <thead>
        <tr><th>Company</th><th>Revenue</th><th>Growth</th></tr>
    </thead>
    <tbody>
        <tr>
            <td>Acme Corp</td>
            <td>$1,234,567</td>
            <td><span style="color: hsl(142 70% 50%)">+12.5%</span></td>
        </tr>
    </tbody>
</table>
"""

url = get_table_url(table_html, "Revenue Report")
print(url)
```

## Verification

After enabling GitHub Pages:
1. Wait 1-2 minutes for deployment
2. Visit: https://anshulsh123.github.io/agent-chat-widget/
3. You should see the table viewer page (with an error message if no data is provided)
4. Test with the example URL above

## Notes

- The `.nojekyll` file ensures GitHub Pages doesn't process the files with Jekyll
- The table viewer is in `/docs/index.html`
- Updates to the `/docs` folder will automatically redeploy
