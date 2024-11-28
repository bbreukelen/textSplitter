export interface TextSplitterParams {
    chunkSize?: number;
    chunkOverlap?: number;
}

export default class TextSplitter {
    constructor(params?: TextSplitterParams);

    chunkSize: number;
    chunkOverlap: number;

    splitTextMetadataAware(text: string, metadata: string): string[];
    splitText(text: string): string[];
    free(): void;
}
