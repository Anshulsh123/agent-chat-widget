import { Sparkles, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "agent";
  content: string;
  timestamp: string;
}

const ChatMessage = ({ role, content, timestamp }: ChatMessageProps) => {
  const isAgent = role === "agent";

  return (
    <div
      className={`flex gap-3 px-4 py-4 ${
        isAgent ? "bg-message-agent" : "bg-message-user"
      }`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
          isAgent
            ? "bg-primary/10 text-primary"
            : "bg-secondary text-secondary-foreground"
        }`}
      >
        {isAgent ? (
          <Sparkles className="w-4 h-4" />
        ) : (
          <User className="w-4 h-4" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-medium text-foreground">
            {isAgent ? "AI Agent" : "You"}
          </span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <p className="text-sm text-foreground whitespace-pre-wrap break-words">
          {content}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
