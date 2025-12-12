import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CanvasPanelProps {
  isOpen: boolean;
  onClose: () => void;
  htmlContent: string;
  title?: string;
}

const CanvasPanel = ({
  isOpen,
  onClose,
  htmlContent,
  title = "Canvas",
}: CanvasPanelProps) => {
  if (!isOpen) return null;

  return (
    <div className="w-96 border-l border-border bg-card flex flex-col">
      {/* Panel Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h2 className="font-semibold text-foreground">{title}</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </header>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {htmlContent ? (
          <div
            className="prose prose-sm max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>No content to display</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CanvasPanel;
