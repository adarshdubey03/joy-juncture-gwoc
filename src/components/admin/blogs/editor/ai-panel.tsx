"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Send } from "lucide-react";
import { generateContentAction, improveTextAction, analyzeSEOAction } from "@/actions/ai/writer";
import { SEOAnalysis } from "@/lib/ai/types";
import { Editor } from "@tiptap/react";
import { toast } from "@/components/ui/use-toast";

interface AIPanelProps {
    editor: Editor | null;
    currentTitle: string;
    onSEOUpdate: (analysis: SEOAnalysis) => void;
}

export function AIPanel({ editor, currentTitle, onSEOUpdate }: AIPanelProps) {
    const [loading, setLoading] = useState(false);
    const [customPrompt, setCustomPrompt] = useState("");

    const handleAction = async (action: 'improve' | 'expand' | 'simplify' | 'seo') => {
        if (!editor) return;
        setLoading(true);

        try {
            const selection = editor.state.selection;
            const text = editor.state.doc.textBetween(selection.from, selection.to, " ");
            const fullText = editor.getText();

            if (action === 'seo') {
                const analysis = await analyzeSEOAction(fullText, currentTitle);
                onSEOUpdate(analysis);
                toast({ title: "SEO Analysis Complete" });
            } else {
                if (!text && action !== 'expand') {
                    toast({ title: "Please select text first", variant: "destructive" });
                    setLoading(false);
                    return;
                }

                let instruction = "";
                switch (action) {
                    case 'improve': instruction = "Improve the grammar and flow of this text."; break;
                    case 'simplify': instruction = "Simplify this text for a general audience."; break;
                    case 'expand': instruction = "Expand on this topic with more details."; break;
                }

                const result = await improveTextAction(text || fullText, instruction);

                // Replace selection or append
                if (text) {
                    editor.chain().focus().deleteSelection().insertContent(result).run();
                } else {
                    editor.chain().focus().insertContent(result).run();
                }
            }
        } catch (error) {
            console.error(error);
            toast({ title: "AI Action Failed", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const handleCustomPrompt = async () => {
        if (!customPrompt || !editor) return;
        setLoading(true);
        try {
            const result = await generateContentAction(customPrompt);
            editor.chain().focus().insertContent(result).run();
            setCustomPrompt("");
        } catch (error) {
            toast({ title: "Generation Failed", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col gap-4">
            <div className="space-y-2">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    AI Actions
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => handleAction('improve')} disabled={loading}>
                        Improve Selection
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => handleAction('simplify')} disabled={loading}>
                        Simplify
                    </Button>
                </div>
                <Button type="button" variant="secondary" className="w-full" size="sm" onClick={() => handleAction('seo')} disabled={loading}>
                    Check SEO Score
                </Button>
            </div>

            <div className="space-y-2 mt-4">
                <h3 className="font-semibold text-sm">Custom Instruction</h3>
                <div className="flex gap-2">
                    <input
                        className="flex-1 text-sm border rounded-md px-2 py-1"
                        placeholder="e.g. Write an intro about..."
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); // Prevent form submission on Enter
                                handleCustomPrompt();
                            }
                        }}
                    />
                    <Button type="button" size="icon" variant="ghost" onClick={handleCustomPrompt} disabled={loading || !customPrompt}>
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}
