import { GeminiProvider } from "./gemini-provider";
import { AIProvider } from "./types";

export function getAIProvider(): AIProvider | null {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.warn("GEMINI_API_KEY is missing via getAIProvider");
        return null;
    }
    return new GeminiProvider(apiKey);
}
