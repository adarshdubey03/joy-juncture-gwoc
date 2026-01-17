"use server";

import { getAIProvider } from "@/lib/ai/factory";
import { SEOAnalysis } from "@/lib/ai/types";

export async function improveTextAction(text: string, instruction: string): Promise<string> {
    const provider = getAIProvider();
    if (!provider) {
        throw new Error("AI Configuration Missing: Please set GEMINI_API_KEY");
    }
    return await provider.improveWriting(text, instruction);
}

export async function generateContentAction(prompt: string, context?: string): Promise<string> {
    const provider = getAIProvider();
    if (!provider) {
        throw new Error("AI Configuration Missing: GEMINI_API_KEY not found");
    }
    return await provider.generateText(prompt, context);
}

export async function analyzeSEOAction(content: string, title: string): Promise<SEOAnalysis> {
    const provider = getAIProvider();
    if (!provider) {
        throw new Error("AI Configuration Missing: GEMINI_API_KEY not found");
    }
    return await provider.analyzeSEO(content, title);
}
