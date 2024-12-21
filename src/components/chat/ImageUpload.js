import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
export function ImageUpload({ onImageSelect, selectedImage, onClearImage, className }) {
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            onImageSelect(file);
        }
    };
    return (_jsxs("div", { className: cn("relative", className), children: [_jsx("input", { type: "file", accept: "image/jpeg,image/png", onChange: handleFileChange, className: "hidden", id: "image-upload" }), selectedImage ? (_jsxs("div", { className: "relative", children: [_jsx("img", { src: selectedImage, alt: "Selected", className: "max-h-48 rounded-lg object-cover" }), _jsx(motion.button, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, onClick: onClearImage, className: "absolute -top-2 -right-2 rounded-full bg-background/80 p-1 backdrop-blur-sm", children: _jsx(X, { className: "h-4 w-4" }) })] })) : (_jsxs(motion.label, { htmlFor: "image-upload", className: "flex cursor-pointer items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm hover:bg-white/5", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(ImageIcon, { className: "h-4 w-4" }), _jsx("span", { children: "Upload Image" })] }))] }));
}
