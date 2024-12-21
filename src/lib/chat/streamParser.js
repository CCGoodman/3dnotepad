// Helper functions to parse streaming responses
export function parseStreamData(data) {
    try {
        // Remove 'data: ' prefix and parse JSON
        const jsonStr = data.replace(/^data: /, '').trim();
        if (jsonStr === '[DONE]')
            return null;
        return JSON.parse(jsonStr);
    }
    catch (error) {
        console.error('Error parsing stream data:', error);
        return null;
    }
}
export function extractContent(chunk) {
    return chunk?.choices?.[0]?.delta?.content || '';
}
