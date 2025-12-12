# AgentChatWindow Input Schema Examples

## Basic Message Structure

```json
{
  "messages": [
    {
      "id": "msg-1",
      "role": "agent",
      "content": "Hello! How can I help you today?",
      "timestamp": "10:30 AM"
    }
  ]
}
```

## Message with Table/HTML Content

```json
{
  "messages": [
    {
      "id": "msg-1",
      "role": "user",
      "content": "Show me sales data",
      "timestamp": "10:31 AM"
    },
    {
      "id": "msg-2",
      "role": "agent",
      "content": "Here's the sales data for Q4:",
      "timestamp": "10:31 AM",
      "tableHtml": "<table><thead><tr><th>Product</th><th>Sales</th><th>Growth</th></tr></thead><tbody><tr><td>Product A</td><td>$50,000</td><td>+15%</td></tr><tr><td>Product B</td><td>$30,000</td><td>+8%</td></tr></tbody></table>",
      "metadata": {
        "canvasTitle": "Q4 Sales Data"
      }
    }
  ]
}
```

## Complex Example with Multiple Messages

```json
{
  "messages": [
    {
      "id": "1",
      "role": "agent",
      "content": "Welcome! I can help you analyze data.",
      "timestamp": "10:00 AM"
    },
    {
      "id": "2",
      "role": "user",
      "content": "What's our revenue this month?",
      "timestamp": "10:01 AM"
    },
    {
      "id": "3",
      "role": "agent",
      "content": "Let me fetch that data for you...",
      "timestamp": "10:01 AM",
      "metadata": {
        "isTyping": true
      }
    },
    {
      "id": "4",
      "role": "agent",
      "content": "Here's your revenue breakdown:",
      "timestamp": "10:02 AM",
      "tableHtml": "<div><h3>Monthly Revenue</h3><table><tr><th>Category</th><th>Amount</th></tr><tr><td>Sales</td><td>$125,000</td></tr><tr><td>Services</td><td>$45,000</td></tr></table></div>",
      "metadata": {
        "canvasTitle": "Monthly Revenue Report"
      }
    }
  ],
  "initialState": {
    "isCanvasOpen": true,
    "canvasTitle": "Data Analysis"
  },
  "config": {
    "agentName": "Data Analyst",
    "agentStatus": "Analyzing data..."
  }
}
```

## Chart/Visualization Example

```json
{
  "messages": [
    {
      "id": "1",
      "role": "agent",
      "content": "I've generated a chart showing the trend:",
      "timestamp": "11:00 AM",
      "tableHtml": "<div class=\"chart-container\"><svg width=\"400\" height=\"300\"><rect x=\"50\" y=\"50\" width=\"300\" height=\"200\" fill=\"#e0e0e0\"/><text x=\"200\" y=\"180\" text-anchor=\"middle\">Chart visualization</text></svg></div>",
      "metadata": {
        "canvasTitle": "Sales Trend Chart"
      }
    }
  ]
}
```

## Full Configuration Example

```json
{
  "messages": [
    {
      "id": "1",
      "role": "agent",
      "content": "Hello! I'm ready to help.",
      "timestamp": "10:30 AM"
    }
  ],
  "initialState": {
    "isCanvasOpen": false,
    "canvasContent": "",
    "canvasTitle": "Analysis Panel"
  },
  "config": {
    "agentName": "AI Assistant",
    "agentStatus": "Online • Ready to assist",
    "placeholder": "Ask me anything...",
    "showCanvasToggle": true,
    "canvasWidth": "28rem"
  }
}
```
