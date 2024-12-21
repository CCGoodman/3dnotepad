import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareMore, Send, X, Maximize2, Settings, ImageIcon } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';
import { ChatMessage } from './chat/ChatMessage';
import { ModelSelector } from './chat/ModelSelector';
import { ImageUpload } from './chat/ImageUpload';
import { playSound } from '@/lib/sounds';
export function AiChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [input, setInput] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const { messages, isTyping, currentResponse, error, sendMessage, model, setModel, selectedImage, imagePreview, handleImageSelect, clearImage } = useChat();
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = input.trim();
        if (!message)
            return;
        setInput('');
        await sendMessage(message);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };
    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
        if (!isFullScreen) {
            setIsOpen(true);
            playSound('menu');
        }
    };
    return (_jsxs(_Fragment, { children: [!isOpen && !isFullScreen && (_jsx(motion.button, { onClick: () => setIsOpen(true), className: "fixed bottom-4 right-4 rounded-full bg-primary p-3 text-primary-foreground shadow-lg", whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(MessageSquareMore, { className: "h-6 w-6" }) })), _jsx(AnimatePresence, { children: (isOpen || isFullScreen) && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, className: cn("fixed bg-black/30 backdrop-blur-lg shadow-xl", isFullScreen
                        ? "inset-0 z-50 flex flex-col h-screen"
                        : "bottom-4 right-4 w-96 rounded-lg"), children: [_jsxs("div", { className: "flex items-center justify-between border-b border-white/10 p-4", children: [_jsx("h3", { className: "font-semibold", children: "AI Assistant" }), _jsxs("div", { className: "flex items-center gap-2", children: [isFullScreen && (_jsx("button", { onClick: () => setShowSettings(!showSettings), className: "rounded-full p-1 hover:bg-white/10 transition-colors", children: _jsx(Settings, { className: "h-4 w-4" }) })), _jsx("button", { onClick: toggleFullScreen, className: "rounded-full p-1 hover:bg-white/10 transition-colors", children: _jsx(Maximize2, { className: "h-4 w-4" }) }), !isFullScreen && (_jsx("button", { onClick: () => setIsOpen(false), className: "rounded-full p-1 hover:bg-white/10 transition-colors", children: _jsx(X, { className: "h-4 w-4" }) }))] })] }), isFullScreen && showSettings && (_jsxs("div", { className: "border-b border-white/10 p-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h4", { className: "text-sm font-medium", children: "Model Settings" }), _jsx(motion.button, { onClick: () => setShowSettings(false), className: "rounded-md px-3 py-1.5 bg-primary text-primary-foreground transition-all duration-200", whileHover: {
                                                scale: 1.05,
                                                backgroundColor: "rgb(255 255 255 / 0.2)"
                                            }, whileTap: { scale: 0.95 }, children: "Apply" })] }), _jsx(ModelSelector, { value: model, onValueChange: setModel })] })), _jsxs("div", { className: cn("flex-1 overflow-y-auto p-4", isFullScreen ? "h-[calc(100vh-8rem)]" : "h-96"), children: [error && (_jsx("div", { className: "mb-4 rounded-lg bg-red-500/10 p-4 text-red-500", children: error })), messages.map((message, i) => (_jsx(ChatMessage, { content: message.content, isUser: message.role === 'user', image: message.image }, i))), isTyping && currentResponse && (_jsx(ChatMessage, { content: currentResponse, isUser: false })), _jsx("div", { ref: messagesEndRef })] }), _jsxs("form", { onSubmit: handleSubmit, className: "border-t border-white/10 p-4", children: [imagePreview && (_jsx("div", { className: "mb-4", children: _jsx(ImageUpload, { selectedImage: imagePreview, onImageSelect: handleImageSelect, onClearImage: clearImage }) })), _jsxs("div", { className: "flex gap-2", children: [!imagePreview && (_jsxs("button", { type: "button", onClick: () => fileInputRef.current?.click(), className: "rounded-md bg-primary/10 p-2 hover:bg-primary/20 transition-colors", children: [_jsx(ImageIcon, { className: "h-5 w-5" }), _jsx("input", { ref: fileInputRef, type: "file", accept: "image/jpeg,image/png", onChange: (e) => e.target.files?.[0] && handleImageSelect(e.target.files[0]), className: "hidden" })] })), _jsx("input", { ref: inputRef, type: "text", value: input, onChange: (e) => setInput(e.target.value), onKeyPress: handleKeyPress, className: "flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary", placeholder: "Type your message...", disabled: isTyping }), _jsx("button", { type: "submit", disabled: isTyping || !input.trim(), className: "rounded-md bg-primary p-2 text-primary-foreground disabled:opacity-50", children: _jsx(Send, { className: "h-5 w-5" }) })] })] })] })) })] }));
}
