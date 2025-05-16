
import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: number;
  content: string;
  isAI: boolean;
  timestamp: Date;
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: "Hi there! How can I help you with your learning journey today?", isAI: true, timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle chat open/close
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isOpen, messages]);

  // Send message
  const handleSendMessage = () => {
    if (input.trim() === "") return;
    
    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      content: input,
      isAI: false,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        content: "Thanks for your message! This is a simulated response from SkillSprint AI. In a real implementation, this would be connected to your AI service.",
        isAI: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? "bg-gray-600" : "bg-skillsprint-500 hover:bg-skillsprint-600 animate-pulse"
        }`}
        aria-label="Open chat"
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 h-96 w-80 rounded-2xl bg-white shadow-xl transition-all duration-300 sm:w-96">
          {/* Chat header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-skillsprint-100 p-2">
                <MessageSquare className="h-5 w-5 text-skillsprint-500" />
              </div>
              <h3 className="font-medium">Ask SkillSprint AI</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat messages */}
          <div className="h-[calc(100%-7.5rem)] overflow-y-auto p-4">
            <div className="flex flex-col space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isAI ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-3/4 rounded-2xl px-4 py-2 ${
                      message.isAI
                        ? "rounded-tl-none bg-gray-100 text-gray-800"
                        : "rounded-tr-none bg-skillsprint-500 text-white"
                    }`}
                  >
                    {message.isAI && (
                      <div className="mb-1 flex items-center">
                        <Avatar className="mr-2 h-5 w-5">
                          <AvatarFallback className="bg-skillsprint-200 text-skillsprint-700 text-xs">AI</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">SkillSprint AI</span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <div className="mt-1 text-right text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat input */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-skillsprint-500 focus:outline-none"
              />
              <Button 
                type="submit" 
                size="icon" 
                className="rounded-full bg-skillsprint-500 hover:bg-skillsprint-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;
