import { motion } from 'framer-motion';
import { ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: string | null;
  onClearImage: () => void;
  className?: string;
}

export function ImageUpload({ onImageSelect, selectedImage, onClearImage, className }: ImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      onImageSelect(file);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <input
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      
      {selectedImage ? (
        <div className="relative">
          <img 
            src={selectedImage} 
            alt="Selected" 
            className="max-h-48 rounded-lg object-cover"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClearImage}
            className="absolute -top-2 -right-2 rounded-full bg-background/80 p-1 backdrop-blur-sm"
          >
            <X className="h-4 w-4" />
          </motion.button>
        </div>
      ) : (
        <motion.label
          htmlFor="image-upload"
          className="flex cursor-pointer items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ImageIcon className="h-4 w-4" />
          <span>Upload Image</span>
        </motion.label>
      )}
    </div>
  );
}