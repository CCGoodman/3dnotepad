import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { formatLongText } from '@/lib/chat/formatText';
import { ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { ImagePreview } from './ImagePreview'; // Ensure you have the ImagePreview component in your project.

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  image?: string | null;
}

export function ChatMessage({ content, isUser, image }: ChatMessageProps) {
  // Clean up the content by removing extra dots and normalizing whitespace
  const cleanContent = content
    .replace(/\s*\.\s*(?=\n|$)/g, '.') // Remove extra dots at line ends
    .replace(/\n{3,}/g, '\n\n') // Reduce multiple line breaks
    .replace('[Image attached] ', '') // Remove the image attached text
    .trim();

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setPreviewImage(imageUrl);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
    setIsPreviewOpen(false);
  };

  return (
    <>
      <div className={cn(
        "mb-4 flex",
        isUser ? 'justify-end' : 'justify-start'
      )}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "max-w-[80%] rounded-lg px-4 py-2",
            isUser ? 'bg-primary text-primary-foreground' : 'bg-white/10'
          )}
        >
          {image && (
            <div className="mb-2">
              <div 
                className="relative cursor-pointer group"
                onClick={() => handleImageClick(image)}
              >
                <img 
                  src={image} 
                  alt="Attached" 
                  className="max-h-48 rounded-lg object-cover transition-transform group-hover:scale-[1.02]" 
                />
                <div className="absolute inset-0 flex items-center justify-center bg-transparent rounded-lg opacity-0 transition-opacity group-hover:opacity-100">
                  <ImageIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )}
          <ReactMarkdown
            className="prose prose-invert max-w-none"
            components={{
              ol: ({ children }) => (
                <ol className="list-decimal pl-4 space-y-1 my-2">{children}</ol>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-4 space-y-1 my-2">{children}</ul>
              ),
              p: ({ children }) => (
                <p className="mb-2 last:mb-0 break-words">{children}</p>
              ),
              h1: ({ children }) => (
                <h1 className="text-xl font-bold mb-2">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg font-bold mb-2">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-base font-bold mb-2">{children}</h3>
              ),
            }}
          >
            {cleanContent}
          </ReactMarkdown>
        </motion.div>
      </div>

      {/* Image Preview Modal */}
      {isPreviewOpen && previewImage && (
        <ImagePreview
          src={previewImage}
          onClose={handleClosePreview}
          isFullscreen={true}
        />
      )}
    </>
  );
}
