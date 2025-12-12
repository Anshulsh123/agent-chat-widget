# Fixed Table Viewer URL

## The Issue
jsDelivr might serve HTML files with incorrect content-type. Use one of these solutions:

## Solution 1: Use GitHub Raw (Recommended)

GitHub's raw content serves HTML files correctly:

**Base URL:**
```
https://raw.githubusercontent.com/Anshulsh123/agent-chat-widget/main/table.html
```

**With Data:**
```
https://raw.githubusercontent.com/Anshulsh123/agent-chat-widget/main/table.html?encoded=<base64-json>
```

## Solution 2: Use jsDelivr with .html extension

**Base URL:**
```
https://cdn.jsdelivr.net/gh/Anshulsh123/agent-chat-widget@main/table.html
```

**With Data:**
```
https://cdn.jsdelivr.net/gh/Anshulsh123/agent-chat-widget@main/table.html?encoded=<base64-json>
```

## Python Function (Updated)

```python
import json
import base64
from urllib.parse import quote

def get_table_url(table_html, title="Data Table", use_github_raw=True):
    """
    Generate URL for table viewer
    
    Args:
        table_html: HTML string of the table
        title: Title for the table page
        use_github_raw: If True, use GitHub raw (more reliable)
    
    Returns:
        Complete URL
    """
    if use_github_raw:
        base_url = "https://raw.githubusercontent.com/Anshulsh123/agent-chat-widget/main/table.html"
    else:
        base_url = "https://cdn.jsdelivr.net/gh/Anshulsh123/agent-chat-widget@main/table.html"
    
    data = {
        "tableHtml": table_html,
        "title": title
    }
    json_str = json.dumps(data)
    encoded = base64.b64encode(json_str.encode()).decode()
    return f"{base_url}?encoded={quote(encoded)}"

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

## Test URLs

### GitHub Raw (Recommended):
```
https://raw.githubusercontent.com/Anshulsh123/agent-chat-widget/main/table.html?encoded=eyJ0YWJsZUh0bWwiOiAiPHRhYmxlPjx0aGVhZD48dHI%2BPHRoPklEPC90aD48dGg%2BTmFtZTwvdGg%2BPHRoPlN0YXR1czwvdGg%2BPHRoPlJldmVudWU8L3RoPjx0aD5Hcm93dGg8L3RoPjwvdHI%2BPC90aGVhZD48dGJvZHk%2BPHRyPjx0ZD4jMDAxPC90ZD48dGQ%2BQWNtZSBDb3JwPC90ZD48dGQ%2BPHNwYW4gc3R5bGU9XCJjb2xvcjogaHNsKDE0MiA3MCUgNTAlKVwiPkFjdGl2ZTwvc3Bhbj48L3RkPjx0ZD4kMSwyMzQsNTY3PC90ZD48dGQ%2BKzEyLjUlPC90ZD48L3RyPjx0cj48dGQ%2BIzAwMjwvdGQ%2BPHRkPkdsb2JleCBJbmM8L3RkPjx0ZD48c3BhbiBzdHlsZT1cImNvbG9yOiBoc2woMTQyIDcwJSA1MCUpXCI%2BQWN0aXZlPC9zcGFuPjwvdGQ%2BPHRkPiQ4OTIsMzQxPC90ZD48dGQ%2BKzguMiU8L3RkPjwvdHI%2BPC90Ym9keT48L3RhYmxlPiIsICJ0aXRsZSI6ICJDb21wYW55IERhdGEifQ%3D%3D
```

### jsDelivr:
```
https://cdn.jsdelivr.net/gh/Anshulsh123/agent-chat-widget@main/table.html?encoded=eyJ0YWJsZUh0bWwiOiAiPHRhYmxlPjx0aGVhZD48dHI%2BPHRoPklEPC90aD48dGg%2BTmFtZTwvdGg%2BPHRoPlN0YXR1czwvdGg%2BPHRoPlJldmVudWU8L3RoPjx0aD5Hcm93dGg8L3RoPjwvdHI%2BPC90aGVhZD48dGJvZHk%2BPHRyPjx0ZD4jMDAxPC90ZD48dGQ%2BQWNtZSBDb3JwPC90ZD48dGQ%2BPHNwYW4gc3R5bGU9XCJjb2xvcjogaHNsKDE0MiA3MCUgNTAlKVwiPkFjdGl2ZTwvc3Bhbj48L3RkPjx0ZD4kMSwyMzQsNTY3PC90ZD48dGQ%2BKzEyLjUlPC90ZD48L3RyPjx0cj48dGQ%2BIzAwMjwvdGQ%2BPHRkPkdsb2JleCBJbmM8L3RkPjx0ZD48c3BhbiBzdHlsZT1cImNvbG9yOiBoc2woMTQyIDcwJSA1MCUpXCI%2BQWN0aXZlPC9zcGFuPjwvdGQ%2BPHRkPiQ4OTIsMzQxPC90ZD48dGQ%2BKzguMiU8L3RkPjwvdHI%2BPC90Ym9keT48L3RhYmxlPiIsICJ0aXRsZSI6ICJDb21wYW55IERhdGEifQ%3D%3D
```

## Note
If the URL still shows code instead of rendering:
1. Try the GitHub Raw URL (Solution 1) - it's more reliable
2. Make sure you're opening it in a browser, not viewing the source
3. The URL should render as an HTML page with the formatted table
