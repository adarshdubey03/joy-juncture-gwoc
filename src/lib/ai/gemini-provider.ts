import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIProvider, SEOAnalysis } from "./types";

export class GeminiProvider implements AIProvider {
    private model;

    constructor(apiKey: string) {
        const genAI = new GoogleGenerativeAI(apiKey);
        this.model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    }

    async generateText(prompt: string, context?: string): Promise<string> {
        try {
            const finalPrompt = context
                ? `Context: ${context}\n\nTask: ${prompt}`
                : prompt;

            const result = await this.model.generateContent(finalPrompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error("Gemini Generate Error:", error);
            throw new Error("Failed to generate text");
        }
    }

    async improveWriting(text: string, instruction: string): Promise<string> {
        try {
            const prompt = `
            Original Text: "${text}"
            
            Instruction: ${instruction}
            
            Return ONLY the improved text. Do not add quotes or explanations.
            `;
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error("Gemini Improve Error:", error);
            return text; // Fallback to original
        }
    }

    async analyzeSEO(content: string, title: string): Promise<SEOAnalysis> {
        try {
            const prompt = `
            Analyze the SEO of this blog post.
            Title: "${title}"
            Content: "${content.substring(0, 1000)}..." (truncated for analysis)

            Return a valid JSON object with this structure:
            {
                "score": number (0-100),
                "suggestions": string[] (array of specific improvements),
                "keywords": string[] (detected keywords)
            }
            Do not include Markdown formatting in the response, just the raw JSON string.
            `;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text().replace(/```json|```/g, "").trim();
            return JSON.parse(text);
        } catch (error) {
            console.error("Gemini SEO Error:", error);
            // Fallback for demo/error
            return {
                score: 50,
                suggestions: ["Could not analyze content completely.", "Check keyword density manually."],
                keywords: []
            };
        }
    }
}
