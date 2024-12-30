import { encoding_for_model } from 'tiktoken';

export default class TextSplitter {
    constructor(params = {}) {
        // Set default values
        this.chunkSize = params.chunkSize ?? 1024;
        this.chunkOverlap = params.chunkOverlap ?? 200;
        this.separator = params.separator ?? ' ';
        this.paragraphSeparator = params.paragraphSeparator ?? '\n\n\n';
        this.secondaryChunkingRegex =
            params.secondaryChunkingRegex ?? '[^,.;。？！]+[,.;。？！]?';

        // Initialize tokenizer with a valid model name
        this.tokenizer = encoding_for_model('gpt-4o');
    }

    splitTextMetadataAware(text, metadata) {
        const metadataLength = this.tokenSize(metadata);
        const effectiveChunkSize = this.chunkSize - metadataLength;
        if (effectiveChunkSize <= 0) {
            throw new Error(
                `Metadata length (${metadataLength}) is longer than chunk size (${this.chunkSize}). Consider increasing the chunk size or decreasing the size of your metadata to avoid this.`
            );
        } else if (effectiveChunkSize < 50) {
            console.warn(
                `Metadata length (${metadataLength}) is close to chunk size (${this.chunkSize}). Resulting chunks are less than 50 tokens. Consider increasing the chunk size or decreasing the size of your metadata to avoid this.`
            );
        }
        return this._splitText(text, effectiveChunkSize);
    }

    splitText(text) {
        return this._splitText(text, this.chunkSize);
    }

    _splitText(text, chunkSize) {
        if (text === '') return [text];

        // Tokenize the entire text
        const tokens = this.tokenizer.encode(text);
        const tokenCount = tokens.length;

        if (tokenCount <= chunkSize) {
            return [text];
        }

        const chunks = [];
        let start = 0;
        let end = chunkSize;

        while (start < tokenCount) {
            const chunkTokens = tokens.slice(start, end);
            // Decode the tokens and convert Uint8Array to string
            const chunkText = new TextDecoder().decode(this.tokenizer.decode(chunkTokens));
            chunks.push(chunkText);

            // Move to the next chunk with overlap
            start = end - this.chunkOverlap;
            if (start < 0) {
                start = 0;
            }
            end = start + chunkSize;
        }

        return this._postprocessChunks(chunks);
    }

    _postprocessChunks(chunks) {
        const newChunks = [];
        for (const chunk of chunks) {
            const trimmedChunk = chunk.trim();
            if (trimmedChunk !== '') {
                newChunks.push(trimmedChunk);
            }
        }
        return newChunks;
    }

    tokenSize(text) {
        const tokens = this.tokenizer.encode(text);
        const length = tokens.length;
        return length;
    }

    // Free the tokenizer when done
    free() {
        this.tokenizer.free();
    }
}

// Voor CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TextSplitter;
}
