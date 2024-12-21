export async function* readStream(response) {
    if (!response.body)
        throw new Error('Response body is null');
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done)
                break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            // Keep the last incomplete line in the buffer
            buffer = lines.pop() || '';
            for (const line of lines) {
                if (line.trim())
                    yield line;
            }
        }
        // Handle any remaining data
        if (buffer.trim())
            yield buffer;
    }
    finally {
        reader.releaseLock();
    }
}
