# Agent Chat Window

A beautiful, modern React component for building AI agent chat interfaces with an integrated canvas panel for displaying rich content like tables, charts, and more.

## Features

- 💬 **Chat Interface**: Clean, modern chat UI with user and agent messages
- 🎨 **Canvas Panel**: Side panel for displaying rich HTML content (tables, charts, etc.)
- ⚡ **Real-time Typing Indicators**: Visual feedback when the agent is responding
- 🎯 **TypeScript**: Fully typed for better developer experience
- 🌙 **Dark Mode Ready**: Built with Tailwind CSS and CSS variables for easy theming
- 📱 **Responsive**: Works on desktop and mobile devices

## Installation

```bash
npm install
```

## Usage

```tsx
import AgentChatWindow from "./AgentChatWindow";

function App() {
  return <AgentChatWindow />;
}
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Component Structure

- `AgentChatWindow.tsx` - Main component
- `ChatMessage.tsx` - Individual message component
- `ChatInput.tsx` - Message input component
- `CanvasPanel.tsx` - Side panel for displaying rich content

## Customization

The component uses Tailwind CSS with CSS variables for easy theming. You can customize colors, spacing, and other design tokens in `src/index.css` and `tailwind.config.js`.

## License

MIT
