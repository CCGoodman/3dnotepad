import { Check, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MistralModel } from '@/types/chat';

const models: { value: MistralModel; label: string; description: string; hasVision?: boolean }[] = [
  {
    value: 'mistral-small-latest',
    label: 'Mistral Small',
    description: 'Fast and efficient for simple tasks'
  },
  {
    value: '"open-mistral-nemo',
    label: 'Mistral Nemo',
    description: 'Balanced performance and capabilities'
  },
  {
    value: 'mistral-large-latest',
    label: 'Mistral Large',
    description: 'Advanced reasoning and complex tasks'
  },
  {
    value: 'pixtral-large-latest',
    label: 'Pixtral Large',
    description: 'Specialized in visual understanding',
    hasVision: true
  },
  {
    value: 'pixtral-12b',
    label: 'Pixtral 12B',
    description: 'Enhanced visual and language processing',
    hasVision: true
  },
  {
    value: 'codestral-latest',
    label: 'Codestral',
    description: 'Optimized for code understanding and generation'
  }
];

interface ModelSelectorProps {
  value: MistralModel;
  onValueChange: (value: MistralModel) => void;
}

export function ModelSelector({ value, onValueChange }: ModelSelectorProps) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-white/70">Model</label>
      <div className="grid grid-cols-2 gap-2">
        {models.map((model) => (
          <button
            key={model.value}
            onClick={() => onValueChange(model.value)}
            className={cn(
              "flex items-start gap-2 rounded-lg border border-white/10 p-3 text-left hover:bg-white/5 transition-colors",
              value === model.value && "border-primary bg-primary/10"
            )}
          >
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-medium">{model.label}</span>
                {model.hasVision && (
                  <ImageIcon className="ml-1.5 h-3.5 w-3.5 text-blue-400" />
                )}
                {value === model.value && (
                  <Check className="ml-2 h-4 w-4 text-primary" />
                )}
              </div>
              <p className="text-sm text-white/70">{model.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}