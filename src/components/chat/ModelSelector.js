import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
const models = [
    {
        value: 'mistral-small-latest',
        label: 'Mistral Small',
        description: 'Fast and efficient for simple tasks'
    },
    {
        value: 'open-mistral-nemo',
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
export function ModelSelector({ value, onValueChange }) {
    return (_jsxs("div", { className: "grid gap-2", children: [_jsx("label", { className: "text-sm font-medium text-white/70", children: "Model" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: models.map((model) => (_jsx("button", { onClick: () => onValueChange(model.value), className: cn("flex items-start gap-2 rounded-lg border border-white/10 p-3 text-left hover:bg-white/5 transition-colors", value === model.value && "border-primary bg-primary/10"), children: _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "font-medium", children: model.label }), model.hasVision && (_jsx(ImageIcon, { className: "ml-1.5 h-3.5 w-3.5 text-blue-400" })), value === model.value && (_jsx(Check, { className: "ml-2 h-4 w-4 text-primary" }))] }), _jsx("p", { className: "text-sm text-white/70", children: model.description })] }) }, model.value))) })] }));
}
