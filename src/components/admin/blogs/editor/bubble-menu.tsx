"use client";
import { BubbleMenu, Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Sparkles } from "lucide-react";
import { improveTextAction } from "@/actions/ai/writer";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

export function EditorBubbleMenu({ editor }: { editor: Editor }) {
    const [loading, setLoading] = useState(false);

    const handleQuickFix = async () => {
        const selection = editor.state.selection;
        const text = editor.state.doc.textBetween(selection.from, selection.to, " ");
        if (!text) return;

        setLoading(true);
        try {
            const improved = await improveTextAction(text, "Fix grammar and improve flow");
            editor.chain().focus().deleteSelection().insertContent(improved).run();
        } catch {
            toast({ title: "AI Error", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="flex overflow-hidden rounded-md border bg-white shadow-md">
            <Button
                type="button"
                variant={editor.isActive("bold") ? "secondary" : "ghost"}
                size="sm"
                className="h-8 rounded-none border-r"
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold className="h-3 w-3" />
            </Button>
            <Button
                type="button"
                variant={editor.isActive("italic") ? "secondary" : "ghost"}
                size="sm"
                className="h-8 rounded-none border-r"
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic className="h-3 w-3" />
            </Button>
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 rounded-none text-purple-600 hover:bg-purple-50"
                onClick={handleQuickFix}
                disabled={loading}
            >
                <Sparkles className={`h-3 w-3 mr-1 ${loading ? "animate-spin" : ""}`} />
                {loading ? "Fixing..." : "AI Fix"}
            </Button>
        </BubbleMenu>
    );
}
