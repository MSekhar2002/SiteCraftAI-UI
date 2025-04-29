import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ArrowLeft, Send, Bot, Sparkles, Code, Download, Copy, Check, 
  RefreshCw, Smartphone, Tablet, Monitor, AlertTriangle 
} from 'lucide-react';

type DeviceMode = 'mobile' | 'tablet' | 'desktop';
type MessageStatus = 'sending' | 'sent' | 'error';
type PreviewType = 'website' | 'code';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  status?: MessageStatus;
  preview?: {
    type: PreviewType;
    content: string;
    error?: string;
  };
}

interface ChatInterfaceProps {
  onBack: () => void;
}

const DEVICE_SIZES = {
  mobile: { 
    width: 375, 
    height: 812,  // iPhone 13/14 height
    label: 'Mobile',
    containerClass: 'max-w-[375px] aspect-[375/812]'
  },
  tablet: { 
    width: 768, 
    height: 1024,  // iPad height
    label: 'Tablet',
    containerClass: 'max-w-[768px] aspect-[768/1024]'
  },
  desktop: { 
    width: '100%', 
    height: '100%',
    label: 'Desktop',
    containerClass: 'w-full h-full'
  }
};


const ChatInterface: React.FC<ChatInterfaceProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [copyStatus, setCopyStatus] = useState<{ [key: string]: boolean }>({});
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  const generateUniqueId = () => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: generateUniqueId(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending',
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/designs/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: input,
          deviceMode: deviceMode 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate design');
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: generateUniqueId(),
        text: `Generated website for ${deviceMode} view based on your prompt: "${input}"`,
        sender: 'ai',
        timestamp: new Date(),
        status: 'sent',
        preview: {
          type: 'website',
          content: data.data.design.html,
        },
      };

      setMessages(prev => [
        ...prev.slice(0, -1),
        { ...prev[prev.length - 1], status: 'sent' },
        aiMessage
      ]);
    } catch (error) {
      const errorMessage: Message = {
        id: generateUniqueId(),
        text: 'Failed to generate design',
        sender: 'ai',
        timestamp: new Date(),
        status: 'error',
        preview: {
          type: 'website',
          content: '',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      };

      setMessages(prev => [
        ...prev.slice(0, -1),
        { ...prev[prev.length - 1], status: 'error' },
        errorMessage
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  const copyToClipboard = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(prev => ({ ...prev, [messageId]: true }));
      setTimeout(() => setCopyStatus(prev => ({ ...prev, [messageId]: false })), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const renderPreview = (message: Message) => {
    if (message.preview?.type !== "website") return null;

    if (message.status === "error" || !message.preview.content) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-red-50 dark:bg-red-900/20">
          <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-red-600 dark:text-red-400 font-semibold">
            Design Generation Failed
          </p>
          <p className="text-red-500 dark:text-red-300 text-sm mt-2">
            {message.preview.error || "Unknown error occurred"}
          </p>
        </div>
      );
    }

    return (
      <iframe
        srcDoc={message.preview.content}
        className="w-full h-full object-contain"
        style={{
          width: "100%",
          height: "100%",
          maxWidth: DEVICE_SIZES[deviceMode].width,
          maxHeight: DEVICE_SIZES[deviceMode].height,
        }}
        title="Generated Website"
        sandbox="allow-scripts allow-same-origin"
      />
    );
  };

  const handleRefresh = () => {
    // Implement refresh logic if needed
    console.log('Refresh clicked');
  };

  const handleDownload = () => {
    // Implement download logic
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.preview?.type === 'website' && lastMessage.preview.content) {
      const blob = new Blob([lastMessage.preview.content], { type: 'text/html' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `sitecraft_design_${new Date().toISOString().replace(/:/g, '-')}.html`;
      link.click();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Chat Section */}
      <div className="w-1/2 flex flex-col h-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50 backdrop-blur-md">
        {/* Header with glassmorphic design */}
        <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/30 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <div className="flex items-center space-x-3">
              <Bot className="w-6 h-6 text-blue-500 animate-pulse" />
              <span className="font-bold text-gray-900 dark:text-white text-lg tracking-wider">
                SiteCraft AI
              </span>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex flex-col max-w-[80%] space-y-1">
                <div
                  className={`p-4 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white ml-auto"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {message.text}
                  {message.status === "sending" && (
                    <span className="ml-2 inline-block animate-pulse">...</span>
                  )}
                  {message.status === "error" && (
                    <span className="ml-2 text-red-500">
                      Error sending message
                    </span>
                  )}
                </div>
                <div
                  className={`flex items-center text-xs ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  } ${
                    message.sender === "user"
                      ? "text-gray-600"
                      : "text-gray-500"
                  }`}
                >
                  {formatTimestamp(message.timestamp)}
                  {message.sender === "ai" && (
                    <div className="flex items-center ml-2 space-x-2">
                      <button
                        onClick={() => copyToClipboard(message.text, message.id)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      >
                        {copyStatus[message.id] ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSubmit}
          className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <div className="flex flex-col space-y-2">
            <div className="relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your website..."
                className="w-full p-4 pr-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none min-h-[60px] max-h-[200px]"
                rows={1}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 bottom-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>AI-powered suggestions</span>
              </div>
              <span>Press Enter to send, Shift + Enter for new line</span>
            </div>
          </div>
        </form>
      </div>

      {/* Preview Section */}
      <div className="w-1/2 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 flex flex-col">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-full p-1">
            {Object.entries(DEVICE_SIZES).map(([mode, config]) => (
              <button
                key={mode}
                onClick={() => setDeviceMode(mode as DeviceMode)}
                className={`flex items-center px-3 py-1 rounded-full transition-all duration-300 ${
                  deviceMode === mode
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
                }`}
              >
                {mode === 'mobile' && <Smartphone className="w-4 h-4 mr-2" />}
                {mode === 'tablet' && <Tablet className="w-4 h-4 mr-2" />}
                {mode === 'desktop' && <Monitor className="w-4 h-4 mr-2" />}
                {config.label}
              </button>
            ))}
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handleRefresh}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded-full transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button 
              onClick={handleDownload}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded-full transition-colors"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className={`flex-1 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 
          ${DEVICE_SIZES[deviceMode].containerClass} mx-auto`}>
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-900/80">
              <Code className="w-16 h-16 text-blue-500 dark:text-blue-400 mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                AI Website Generator
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-md">
                Describe your ideal website. Our AI will transform your vision into a responsive design.
              </p>
            </div>
          ) : (
            renderPreview(messages[messages.length - 1])
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;