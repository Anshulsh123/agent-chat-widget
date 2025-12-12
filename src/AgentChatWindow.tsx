import { useState, useRef, useEffect } from "react";

import { PanelRightOpen, PanelRightClose, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

import ChatMessage from "./ChatMessage";

import ChatInput from "./ChatInput";

import CanvasPanel from "./CanvasPanel";



interface Message {

  id: string;

  role: "user" | "agent";

  content: string;

  timestamp: string;

  tableHtml?: string;

}



// Sample HTML table for demo

const sampleTableHtml = `

<table>

  <thead>

    <tr>

      <th>ID</th>

      <th>Name</th>

      <th>Status</th>

      <th>Revenue</th>

      <th>Growth</th>

    </tr>

  </thead>

  <tbody>

    <tr>

      <td>#001</td>

      <td>Acme Corp</td>

      <td><span style="color: hsl(142 70% 50%)">Active</span></td>

      <td>$1,234,567</td>

      <td>+12.5%</td>

    </tr>

    <tr>

      <td>#002</td>

      <td>Globex Inc</td>

      <td><span style="color: hsl(142 70% 50%)">Active</span></td>

      <td>$892,341</td>

      <td>+8.2%</td>

    </tr>

    <tr>

      <td>#003</td>

      <td>Initech</td>

      <td><span style="color: hsl(45 90% 50%)">Pending</span></td>

      <td>$456,789</td>

      <td>+3.1%</td>

    </tr>

    <tr>

      <td>#004</td>

      <td>Umbrella LLC</td>

      <td><span style="color: hsl(0 70% 55%)">Inactive</span></td>

      <td>$234,567</td>

      <td>-2.4%</td>

    </tr>

    <tr>

      <td>#005</td>

      <td>Stark Industries</td>

      <td><span style="color: hsl(142 70% 50%)">Active</span></td>

      <td>$5,678,901</td>

      <td>+24.7%</td>

    </tr>

  </tbody>

</table>

`;



interface AgentChatWindowProps {
  initialData?: {
    messages?: Message[];
    initialState?: {
      isCanvasOpen?: boolean;
      canvasTitle?: string;
    };
    config?: {
      agentName?: string;
      agentStatus?: string;
    };
  };
}

const AgentChatWindow = ({ initialData }: AgentChatWindowProps = {}) => {
  const defaultMessage: Message = {
    id: "1",
    role: "agent",
    content: "Hello! I'm your AI agent. I can help you analyze data and display results in the canvas panel. Try asking me to show you some company data!",
    timestamp: "10:30 AM",
  };

  const [messages, setMessages] = useState<Message[]>(
    initialData?.messages || [defaultMessage]
  );

  const [isCanvasOpen, setIsCanvasOpen] = useState(
    initialData?.initialState?.isCanvasOpen || false
  );

  const [currentTableHtml, setCurrentTableHtml] = useState("");

  const [isTyping, setIsTyping] = useState(false);
  
  const [agentName] = useState(initialData?.config?.agentName || "AI Agent");
  const [agentStatus] = useState(initialData?.config?.agentStatus || "Online • Ready to assist");

  const messagesEndRef = useRef<HTMLDivElement>(null);



  const scrollToBottom = () => {

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  };



  useEffect(() => {

    scrollToBottom();

  }, [messages]);

  // Handle initial messages with tableHtml
  useEffect(() => {
    if (initialData?.messages) {
      // Find the last message with tableHtml
      const lastMessageWithTable = [...initialData.messages]
        .reverse()
        .find(msg => msg.tableHtml);
      
      if (lastMessageWithTable?.tableHtml) {
        setCurrentTableHtml(lastMessageWithTable.tableHtml);
        if (initialData.initialState?.isCanvasOpen !== false) {
          setIsCanvasOpen(true);
        }
      }
    }
  }, [initialData]);

  // Handle initial messages with tableHtml
  useEffect(() => {
    if (initialData?.messages) {
      // Find the last message with tableHtml
      const lastMessageWithTable = [...initialData.messages]
        .reverse()
        .find(msg => msg.tableHtml);
      
      if (lastMessageWithTable?.tableHtml) {
        setCurrentTableHtml(lastMessageWithTable.tableHtml);
        if (initialData.initialState?.isCanvasOpen !== false) {
          setIsCanvasOpen(true);
        }
      }
    }
  }, [initialData]);



  const handleSendMessage = (content: string) => {

    const userMessage: Message = {

      id: Date.now().toString(),

      role: "user",

      content,

      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),

    };



    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);



    // Simulate agent response

    setTimeout(() => {

      const shouldShowTable = content.toLowerCase().includes("data") || 

                              content.toLowerCase().includes("table") || 

                              content.toLowerCase().includes("show") ||

                              content.toLowerCase().includes("company");



      const agentMessage: Message = {

        id: (Date.now() + 1).toString(),

        role: "agent",

        content: shouldShowTable

          ? "I've analyzed the company data and prepared a table for you. Opening it in the canvas panel now."

          : "I understand your request. Feel free to ask me to show data tables, and I'll display them in the canvas panel on the right.",

        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),

        tableHtml: shouldShowTable ? sampleTableHtml : undefined,

      };



      setMessages((prev) => [...prev, agentMessage]);

      setIsTyping(false);



      if (shouldShowTable) {

        setCurrentTableHtml(sampleTableHtml);

        setIsCanvasOpen(true);

      }

    }, 1500);

  };



  const toggleCanvas = () => {

    if (!isCanvasOpen && currentTableHtml) {

      setIsCanvasOpen(true);

    } else if (!isCanvasOpen && !currentTableHtml) {

      // If no table yet, show a demo

      setCurrentTableHtml(sampleTableHtml);

      setIsCanvasOpen(true);

    } else {

      setIsCanvasOpen(false);

    }

  };



  return (

    <div className="flex h-screen w-full bg-background">

      {/* Chat Section */}

      <div className="flex-1 flex flex-col min-w-0">

        {/* Chat Header */}

        <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">

          <div className="flex items-center gap-3">

            <div className="p-2 rounded-lg bg-primary/10">

              <Sparkles className="w-5 h-5 text-primary" />

            </div>

            <div>

              <h1 className="font-semibold text-foreground">{agentName}</h1>

              <p className="text-xs text-muted-foreground">{agentStatus}</p>

            </div>

          </div>

          <Button

            variant="outline"

            size="sm"

            onClick={toggleCanvas}

            className="gap-2 border-border text-secondary-foreground hover:bg-secondary hover:text-foreground"

          >

            {isCanvasOpen ? (

              <>

                <PanelRightClose className="w-4 h-4" />

                <span className="hidden sm:inline">Hide Canvas</span>

              </>

            ) : (

              <>

                <PanelRightOpen className="w-4 h-4" />

                <span className="hidden sm:inline">Show Canvas</span>

              </>

            )}

          </Button>

        </header>



        {/* Messages */}

        <div className="flex-1 overflow-y-auto bg-chat">

          <div className="divide-y divide-border/50">

            {messages.map((message) => (

              <ChatMessage

                key={message.id}

                role={message.role}

                content={message.content}

                timestamp={message.timestamp}

              />

            ))}

            {isTyping && (

              <div className="flex gap-3 px-4 py-4 bg-message-agent">

                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">

                  <Sparkles className="w-4 h-4" />

                </div>

                <div className="flex items-center gap-1 pt-2">

                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" />

                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse [animation-delay:0.2s]" />

                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-pulse [animation-delay:0.4s]" />

                </div>

              </div>

            )}

          </div>

          <div ref={messagesEndRef} />

        </div>



        {/* Input */}

        <ChatInput onSend={handleSendMessage} disabled={isTyping} />

      </div>



      {/* Canvas Panel */}

      <CanvasPanel

        isOpen={isCanvasOpen}

        onClose={() => setIsCanvasOpen(false)}

        htmlContent={currentTableHtml}

        title={initialData?.initialState?.canvasTitle || "Company Data"}

      />

    </div>

  );

};



export default AgentChatWindow;
