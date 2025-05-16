
import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles } from "lucide-react";
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
    { 
      id: 1, 
      content: "Hi there! I'm your SkillSprint AI assistant. How can I help with your learning journey today?", 
      isAI: true, 
      timestamp: new Date() 
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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

  // Mock AI responses based on user input
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Wait to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Roadmap related responses
    if (lowerCaseMessage.includes('roadmap') || lowerCaseMessage.includes('learning path')) {
      if (lowerCaseMessage.includes('web') || lowerCaseMessage.includes('frontend') || lowerCaseMessage.includes('developer')) {
        return "I've created a Web Development roadmap for you! Here are the key stages:\n\n1. **Fundamentals**: HTML, CSS, JavaScript basics\n2. **Frontend Frameworks**: React, Vue, or Angular\n3. **State Management**: Redux, Context API\n4. **Backend Integration**: APIs, Authentication\n5. **Deployment & Performance**: Optimize and deploy your apps\n\nWould you like me to add this roadmap to your dashboard?";
      }
      
      if (lowerCaseMessage.includes('ai') || lowerCaseMessage.includes('machine learning') || lowerCaseMessage.includes('ml')) {
        return "Here's a Machine Learning roadmap I've designed for you:\n\n1. **Foundations**: Python, Statistics, Linear Algebra\n2. **ML Basics**: Supervised Learning, Regression, Classification\n3. **Deep Learning**: Neural Networks, CNN, RNN\n4. **Specializations**: NLP, Computer Vision, Reinforcement Learning\n5. **Deployment**: MLOps, Model Serving\n\nWould you like to start with this roadmap?";
      }
      
      return "I'd be happy to create a custom roadmap for you! Could you tell me more specifically what skill or technology you're interested in learning?";
    }
    
    // Resources related responses
    if (lowerCaseMessage.includes('resource') || lowerCaseMessage.includes('course') || lowerCaseMessage.includes('tutorial')) {
      return "Here are some excellent free resources I recommend:\n\n• **freeCodeCamp**: Comprehensive web development curriculum\n• **Coursera** (audit option): University-level courses\n• **YouTube**: Check out channels like Traversy Media, The Net Ninja\n• **MDN Web Docs**: For web technologies reference\n• **Khan Academy**: For computer science fundamentals\n\nAny specific topic you're looking for?";
    }
    
    // Quiz related responses
    if (lowerCaseMessage.includes('quiz') || lowerCaseMessage.includes('test') || lowerCaseMessage.includes('assessment')) {
      return "Quizzes are a great way to test your knowledge! Each level in your roadmap includes a quiz that awards 15 points when you pass. Would you like me to create a practice quiz on a specific topic to help you prepare?";
    }
    
    // General responses
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi ')) {
      return "Hello! I'm your SkillSprint AI assistant. I can help you create custom learning roadmaps, find resources, or answer questions about your learning journey. What would you like to explore today?";
    }
    
    if (lowerCaseMessage.includes('thank')) {
      return "You're welcome! Remember, I'm here to help you succeed in your learning journey. Don't hesitate to ask if you need any more assistance!";
    }
    
    // Default response
    return "Thanks for your message! I can help you with creating custom roadmaps, finding learning resources, understanding concepts, or tracking your progress. How can I assist with your learning goals today?";
  };

  // Send message
  const handleSendMessage = async () => {
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
    setIsTyping(true);
    
    try {
      // Generate AI response
      const aiResponseText = await generateAIResponse(input);
      
      // Add AI response
      const aiResponse: Message = {
        id: messages.length + 2,
        content: aiResponseText,
        isAI: true,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error generating AI response:", error);
      
      // Add error message
      const errorResponse: Message = {
        id: messages.length + 2,
        content: "I'm sorry, I encountered an error processing your request. Please try again later.",
        isAI: true,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  // Format message content with markdown-like syntax
  const formatMessage = (content: string) => {
    // Replace markdown-style bold with HTML
    const withBold = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace newlines with line breaks
    const withLineBreaks = withBold.replace(/\n/g, '<br>');
    
    // Return as HTML
    return <div dangerouslySetInnerHTML={{ __html: withLineBreaks }} />;
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
                <Sparkles className="h-5 w-5 text-skillsprint-500" />
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
                    <div className="text-sm">{formatMessage(message.content)}</div>
                    <div className="mt-1 text-right text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-tl-none bg-gray-100 px-4 py-2 text-gray-800">
                    <div className="mb-1 flex items-center">
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarFallback className="bg-skillsprint-200 text-skillsprint-700 text-xs">AI</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">SkillSprint AI</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0.2s" }}></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              
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
                placeholder="Ask about roadmaps, courses..."
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-skillsprint-500 focus:outline-none"
                disabled={isTyping}
              />
              <Button 
                type="submit" 
                size="icon" 
                className="rounded-full bg-skillsprint-500 hover:bg-skillsprint-600"
                disabled={isTyping || !input.trim()}
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
