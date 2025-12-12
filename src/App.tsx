import { useEffect, useState } from "react";
import AgentChatWindow from "./AgentChatWindow";
import "./index.css";

interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: string;
  tableHtml?: string;
  metadata?: {
    canvasTitle?: string;
    isTyping?: boolean;
  };
}

interface InputData {
  messages: Message[];
  initialState?: {
    isCanvasOpen?: boolean;
    canvasTitle?: string;
  };
  config?: {
    agentName?: string;
    agentStatus?: string;
  };
}

function App() {
  const [inputData, setInputData] = useState<InputData | null>(null);

  useEffect(() => {
    // Try to get data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get("data");
    const encodedData = urlParams.get("encoded");

    if (encodedData) {
      try {
        // Decode base64 encoded JSON
        const decoded = atob(encodedData);
        const parsed = JSON.parse(decoded);
        setInputData(parsed);
        return;
      } catch (e) {
        console.error("Failed to decode URL data:", e);
      }
    }

    if (dataParam) {
      try {
        // Direct JSON in URL (for shorter data)
        const parsed = JSON.parse(decodeURIComponent(dataParam));
        setInputData(parsed);
        return;
      } catch (e) {
        console.error("Failed to parse URL data:", e);
      }
    }

    // Try to get from window.postMessage (for iframe embedding)
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "agent-chat-data") {
        setInputData(event.data.payload);
      }
    };

    window.addEventListener("message", handleMessage);

    // Check if parent window has data
    if (window.parent !== window) {
      window.parent.postMessage({ type: "request-data" }, "*");
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // If no input data, use default
  if (!inputData) {
    return <AgentChatWindow />;
  }

  // Pass input data to component (we'll need to update AgentChatWindow to accept props)
  return <AgentChatWindow initialData={inputData} />;
}

export default App;
