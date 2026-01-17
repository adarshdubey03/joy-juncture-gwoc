export interface SEOAnalysis {
    score: number;
    suggestions: string[];
    keywords: string[];
}

export interface AIProvider {
    generateText(prompt: string, context?: string): Promise<string>;
    improveWriting(text: string, instruction: string): Promise<string>;
    analyzeSEO(content: string, title: string): Promise<SEOAnalysis>;
}
