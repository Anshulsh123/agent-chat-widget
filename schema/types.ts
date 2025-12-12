/**
 * TypeScript interfaces matching the input schema for AgentChatWindow
 */

export interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: string;
  tableHtml?: string;
  metadata?: {
    isTyping?: boolean;
    canvasTitle?: string;
    actions?: Array<{
      label: string;
      action: string;
      payload?: Record<string, any>;
    }>;
  };
}

export interface InitialState {
  isCanvasOpen?: boolean;
  canvasContent?: string;
  canvasTitle?: string;
}

export interface ComponentConfig {
  agentName?: string;
  agentStatus?: string;
  placeholder?: string;
  showCanvasToggle?: boolean;
  canvasWidth?: string;
}

export interface AgentChatWindowInput {
  messages: Message[];
  initialState?: InitialState;
  config?: ComponentConfig;
}
