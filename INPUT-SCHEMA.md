# AgentChatWindow Input Schema

This document describes the JSON input format for the AgentChatWindow component to render agent outputs.

## Overview

The component accepts a JSON object with three main sections:
- `messages`: Array of chat messages
- `initialState`: Initial state configuration
- `config`: Component configuration options

## Schema

### Root Object

```json
{
  "messages": Message[],
  "initialState": InitialState (optional),
  "config": ComponentConfig (optional)
}
```

### Message Object

```typescript
{
  "id": string,                    // Required: Unique message identifier
  "role": "user" | "agent",        // Required: Message sender role
  "content": string,               // Required: Message text content
  "timestamp": string,             // Required: Time in "HH:MM AM/PM" format
  "tableHtml": string,             // Optional: HTML content for canvas panel
  "metadata": {                    // Optional: Additional message metadata
    "isTyping": boolean,           // Whether agent is typing
    "canvasTitle": string,         // Title for canvas when tableHtml is present
    "actions": [                   // Optional action buttons
      {
        "label": string,
        "action": string,
        "payload": object
      }
    ]
  }
}
```

### InitialState Object

```typescript
{
  "isCanvasOpen": boolean,          // Whether canvas panel is open initially
  "canvasContent": string,          // Initial HTML content for canvas
  "canvasTitle": string            // Title for canvas panel
}
```

### ComponentConfig Object

```typescript
{
  "agentName": string,             // Display name for AI agent (default: "AI Agent")
  "agentStatus": string,           // Status text (default: "Online • Ready to assist")
  "placeholder": string,            // Input placeholder text
  "showCanvasToggle": boolean,      // Show/hide canvas toggle button
  "canvasWidth": string            // Canvas panel width (CSS value, default: "24rem")
}
```

## Examples

### Minimal Example

```json
{
  "messages": [
    {
      "id": "1",
      "role": "agent",
      "content": "Hello! How can I help?",
      "timestamp": "10:30 AM"
    }
  ]
}
```

### Message with Table Output

```json
{
  "messages": [
    {
      "id": "1",
      "role": "user",
      "content": "Show me the revenue data",
      "timestamp": "10:31 AM"
    },
    {
      "id": "2",
      "role": "agent",
      "content": "Here's the revenue breakdown:",
      "timestamp": "10:31 AM",
      "tableHtml": "<table><thead><tr><th>Company</th><th>Revenue</th><th>Growth</th></tr></thead><tbody><tr><td>Acme Corp</td><td>$1,234,567</td><td>+12.5%</td></tr></tbody></table>",
      "metadata": {
        "canvasTitle": "Revenue Data"
      }
    }
  ]
}
```

### Full Configuration Example

```json
{
  "messages": [
    {
      "id": "1",
      "role": "agent",
      "content": "Welcome! I can analyze data and show results.",
      "timestamp": "10:00 AM"
    },
    {
      "id": "2",
      "role": "user",
      "content": "Show me Q4 sales",
      "timestamp": "10:01 AM"
    },
    {
      "id": "3",
      "role": "agent",
      "content": "Analyzing Q4 sales data...",
      "timestamp": "10:01 AM",
      "tableHtml": "<table><thead><tr><th>Month</th><th>Sales</th><th>Target</th></tr></thead><tbody><tr><td>October</td><td>$125K</td><td>$120K</td></tr><tr><td>November</td><td>$140K</td><td>$130K</td></tr><tr><td>December</td><td>$160K</td><td>$150K</td></tr></tbody></table>",
      "metadata": {
        "canvasTitle": "Q4 Sales Report"
      }
    }
  ],
  "initialState": {
    "isCanvasOpen": true,
    "canvasTitle": "Data Analysis"
  },
  "config": {
    "agentName": "Data Analyst",
    "agentStatus": "Analyzing...",
    "placeholder": "Ask about sales, revenue, or trends...",
    "showCanvasToggle": true,
    "canvasWidth": "28rem"
  }
}
```

## HTML Content Guidelines

When providing `tableHtml`, you can include:

1. **Tables**: Standard HTML tables with styling
2. **Charts**: SVG or canvas-based visualizations
3. **Formatted Content**: Any HTML that should be displayed in the canvas panel

### Table Example

```html
<table>
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
  </tbody>
</table>
```

### Styled Table Example

```html
<table style="width: 100%; border-collapse: collapse;">
  <thead>
    <tr style="background-color: #f3f4f6;">
      <th style="padding: 8px; text-align: left;">Name</th>
      <th style="padding: 8px; text-align: right;">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 8px;">Item 1</td>
      <td style="padding: 8px; text-align: right;">$1,000</td>
    </tr>
  </tbody>
</table>
```

## Usage in Code

```typescript
import AgentChatWindow from "./AgentChatWindow";

const inputData: AgentChatWindowInput = {
  messages: [
    {
      id: "1",
      role: "agent",
      content: "Hello!",
      timestamp: "10:30 AM",
      tableHtml: "<table>...</table>",
      metadata: {
        canvasTitle: "Results"
      }
    }
  ],
  config: {
    agentName: "My AI Assistant"
  }
};

// Pass to component
<AgentChatWindow initialData={inputData} />
```

## Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `messages` | Array | Yes | List of chat messages |
| `messages[].id` | String | Yes | Unique identifier |
| `messages[].role` | "user" \| "agent" | Yes | Message sender |
| `messages[].content` | String | Yes | Message text |
| `messages[].timestamp` | String | Yes | Time display |
| `messages[].tableHtml` | String | No | HTML for canvas panel |
| `messages[].metadata.canvasTitle` | String | No | Canvas panel title |
| `initialState.isCanvasOpen` | Boolean | No | Initial canvas state |
| `initialState.canvasTitle` | String | No | Canvas panel title |
| `config.agentName` | String | No | Agent display name |
| `config.agentStatus` | String | No | Status text |
| `config.placeholder` | String | No | Input placeholder |
| `config.showCanvasToggle` | Boolean | No | Show toggle button |
| `config.canvasWidth` | String | No | Canvas width (CSS) |
