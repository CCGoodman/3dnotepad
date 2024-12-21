import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { ImagePreview } from './ImagePreview'; // Ensure you have the ImagePreview component in your project.
export function ChatMessage({ content, isUser, image }) {
    // Clean up the content by removing extra dots and normalizing whitespace
    const cleanContent = content
        .replace(/\s*\.\s*(?=\n|$)/g, '.') // Remove extra dots at line ends
        .replace(/\n{3,}/g, '\n\n') // Reduce multiple line breaks
        .replace('[Image attached] ', '') // Remove the image attached text
        .trim();
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const handleImageClick = (imageUrl) => {
        setPreviewImage(imageUrl);
        setIsPreviewOpen(true);
    };
    const handleClosePreview = () => {
        setPreviewImage(null);
        setIsPreviewOpen(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: cn("mb-4 flex", isUser ? 'justify-end' : 'justify-start'), children: _jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: cn("max-w-[80%] rounded-lg px-4 py-2", isUser ? 'bg-primary text-primary-foreground' : 'bg-white/10'), children: [image && (_jsx("div", { className: "mb-2", children: _jsxs("div", { className: "relative cursor-pointer group", onClick: () => handleImageClick(image), children: [_jsx("img", { src: image, alt: "Attached", className: "max-h-48 rounded-lg object-cover transition-transform group-hover:scale-[1.02]" }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-transparent rounded-lg opacity-0 transition-opacity group-hover:opacity-100", children: _jsx(ImageIcon, { className: "w-6 h-6 text-white" }) })] }) })), _jsx(ReactMarkdown, { className: "prose prose-invert max-w-none", components: {
                                ol: ({ children }) => (_jsx("ol", { className: "list-decimal pl-4 space-y-1 my-2", children: children })),
                                ul: ({ children }) => (_jsx("ul", { className: "list-disc pl-4 space-y-1 my-2", children: children })),
                                p: ({ children }) => (_jsx("p", { className: "mb-2 last:mb-0 break-words", children: children })),
                                h1: ({ children }) => (_jsx("h1", { className: "text-xl font-bold mb-2", children: children })),
                                h2: ({ children }) => (_jsx("h2", { className: "text-lg font-bold mb-2", children: children })),
                                h3: ({ children }) => (_jsx("h3", { className: "text-base font-bold mb-2", children: children })),
                            }, children: cleanContent })] }) }), isPreviewOpen && previewImage && (_jsx(ImagePreview, { src: previewImage, onClose: handleClosePreview, isFullscreen: true }))] }));
}
