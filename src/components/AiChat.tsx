import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareMore, Send, X, Maximize2, Settings, ImageIcon } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';
import { ChatMessage } from './chat/ChatMessage';
import { ModelSelector } from './chat/ModelSelector';
import { ImageUpload } from './chat/ImageUpload';
import { MistralModel } from '@/types/chat';
import { playSound } from '@/lib/sounds';

export function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [input, setInput] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const { 
    messages, 
    isTyping, 
    currentResponse, 
    error, 
    sendMessage, 
    model, 
    setModel,
    selectedImage,
    imagePreview,
    handleImageSelect,
    clearImage
  } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, currentResponse]);

  useEffect(() => {
    if (isOpen && !isTyping) {
      inputRef.current?.focus();
    }
  }, [isOpen, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = input.trim();
    if (!message) return;
    
    setInput('');
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (!isFullScreen) {
      setIsOpen(true);
      playSound('menu');
    }
  };

  return (
    <>
      {!isOpen && !isFullScreen && (
        <motion.button
          onClick={() => setIsOpen(true)} 
          className="fixed bottom-4 right-4 rounded-full bg-primary p-3 text-primary-foreground shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageSquareMore className="h-6 w-6" />
        </motion.button>
      )}

      <AnimatePresence>
        {(isOpen || isFullScreen) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
              "fixed bg-black/30 backdrop-blur-lg shadow-xl",
              isFullScreen 
                ? "inset-0 z-50 flex flex-col h-screen" 
                : "bottom-4 right-4 w-96 rounded-lg"
            )}
          >
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <h3 className="font-semibold">AI Assistant</h3>
                <div className="flex items-center gap-2">
                  {isFullScreen && (
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="rounded-full p-1 hover:bg-white/10 transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={toggleFullScreen}
                    className="rounded-full p-1 hover:bg-white/10 transition-colors"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                  {!isFullScreen && (
                    <button
                      onClick={() => 
                      setIsOpen(false)}
                      className="rounded-full p-1 hover:bg-white/10 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {isFullScreen && showSettings && (
                <div className="border-b border-white/10 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-medium">Model Settings</h4>
                    <motion.button
                      onClick={() => setShowSettings(false)}
                      className="rounded-md px-3 py-1.5 bg-primary text-primary-foreground transition-all duration-200"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "rgb(255 255 255 / 0.2)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Apply
                    </motion.button>
                  </div>
                  <ModelSelector
                    value={model}
                    onValueChange={setModel}
                  />
                </div>
              )}

              <div className={cn(
                "flex-1 overflow-y-auto p-4",
                isFullScreen ? "h-[calc(100vh-8rem)]" : "h-96"
              )}>
                {error && (
                  <div className="mb-4 rounded-lg bg-red-500/10 p-4 text-red-500">
                    {error}
                  </div>
                )}
                {messages.map((message, i) => (
                  <ChatMessage
                    key={i}
                    content={message.content}
                    isUser={message.role === 'user'}
                    image={message.image} // Pass the image prop
                  />
                ))}
                {isTyping && currentResponse && (
                  <ChatMessage content={currentResponse} isUser={false} />
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSubmit} className="border-t border-white/10 p-4">
                {imagePreview && (
                  <div className="mb-4">
                    <ImageUpload
                      selectedImage={imagePreview}
                      onImageSelect={handleImageSelect}
                      onClearImage={clearImage}
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  {!imagePreview && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-md bg-primary/10 p-2 hover:bg-primary/20 transition-colors"
                    >
                      <ImageIcon className="h-5 w-5" />
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={(e) => e.target.files?.[0] && handleImageSelect(e.target.files[0])}
                        className="hidden"
                      />
                    </button>
                  )}
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Type your message..."
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    disabled={isTyping || !input.trim()}
                    className="rounded-md bg-primary p-2 text-primary-foreground disabled:opacity-50"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}