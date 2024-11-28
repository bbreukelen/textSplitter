declare module 'TextSplitter' {
    export interface TextSplitterParams {
        chunkSize?: number;
        chunkOverlap?: number;
        separator?: string;
        paragraphSeparator?: string;
        secondaryChunkingRegex?: string;
    }

    export default class TextSplitter {
        constructor(params?: TextSplitterParams);

        chunkSize: number;
        chunkOverlap: number;

        tokenizer: any;

        splitTextMetadataAware(text: string, metadata: string): string[];
        splitText(text: string): string[];
        free(): void;
    }
}
