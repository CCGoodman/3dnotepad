import { getMistralApiKey } from '../apiConfig';
import { readStream } from './streamReader';
import { parseStreamData, extractContent } from './streamParser';
import { MistralModel } from '@/types/chat';
import { ChatMessage } from '@/types/chat';

const VISION_MODELS = ['pixtral-large-latest', 'pixtral-12b'];

function isVisionModel(model: MistralModel): boolean {
  return VISION_MODELS.includes(model);
}

async function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function streamCompletion(
  content: string, 
  model: MistralModel = 'mistral-medium',
  onChunk: (text: string) => void,
  image?: File,
  conversationHistory: ChatMessage[] = []
) {
  const apiKey = getMistralApiKey();
  
  // Build the messages array with conversation history
  let messages = [
    ...conversationHistory.map(msg => ({
      role: msg.role,
      content: msg.image ? `[Image attached] ${msg.content}` : msg.content
    }))
  ];

  // Add the current message
  if (image && isVisionModel(model)) {
    const base64Image = await imageToBase64(image);
    messages.push({
      role: 'user',
      content: [
        { type: 'text', text: content },
        {
          type: 'image_url',
          image_url: {
            url: base64Image,
            detail: 'auto'
          }
        }
      ]
    });
  } else {
    messages.push({ role: 'user', content });
  }

  const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
      temperature: 0.7,
      max_tokens: 1000
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API request failed: ${response.status} - ${error}`);
  }

  let fullResponse = '';
  let buffer = '';
  const punctuationMarks = ['.', '!', '?', ':', ';'];
  
  for await (const line of readStream(response)) {
    const chunk = parseStreamData(line);
    if (!chunk) continue;
    
    const content = extractContent(chunk);
    if (content) {
      buffer += content;
      fullResponse += content;
      
      if (punctuationMarks.some(mark => buffer.includes(mark)) || buffer.includes('\n')) {
        onChunk(fullResponse);
        buffer = '';
      }
    }
  }
  
  if (buffer) {
    onChunk(fullResponse);
  }

  return fullResponse;
}