import { useState, useCallback, useEffect, useRef } from 'react';
import { ChatMessage, MistralModel } from '@/types/chat';
import { streamCompletion } from '@/lib/chat/mistralClient';
import { saveChatMessages, loadChatMessages } from '@/lib/storage';

const MODEL_STORAGE_KEY = 'notepad-chat-model';
const MAX_CONTEXT_LENGTH = 20; // Keep last 10 messages for context

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadChatMessages());
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [model, setModel] = useState<MistralModel>(() => 
    localStorage.getItem(MODEL_STORAGE_KEY) as MistralModel || 'mistral-medium'
  );

  // Save messages whenever they change
  useEffect(() => {
    saveChatMessages(messages);
  }, [messages]);

  // Save model whenever it changes
  useEffect(() => {
    localStorage.setItem(MODEL_STORAGE_KEY, model);
  }, [model]);

  const handleImageSelect = useCallback((file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const clearImage = useCallback(() => {
    setSelectedImage(null);
    setImagePreview(null);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    try {
      const userMessage: ChatMessage = {
        role: 'user',
        content,
        timestamp: new Date(),
        image: imagePreview
      };

      // Add the new user message
      setMessages(prev => [...prev, userMessage]);
      clearImage();
      setIsTyping(true);
      setCurrentResponse('');

      // Get recent conversation history for context
      const recentMessages = messages.slice(-MAX_CONTEXT_LENGTH);
      
      // Include image context if present
      let contextContent = content;
      if (imagePreview) {
        contextContent = `[Image attached] ${content}`;
      }

      // Stream the response with conversation context
      const fullResponse = await streamCompletion(
        contextContent,
        model,
        (text) => {
          setCurrentResponse(text);
        },
        selectedImage,
        recentMessages // Pass recent messages for context
      );

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: fullResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsTyping(false);
      setCurrentResponse('');
    }
  }, [model, selectedImage, imagePreview, clearImage, messages]);

  return {
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
  };
}