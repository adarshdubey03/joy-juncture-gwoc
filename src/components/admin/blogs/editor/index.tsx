"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import BubbleMenuExtension from "@tiptap/extension-bubble-menu";
import { useEffect, useState } from "react";
import { EditorToolbar } from "./editor-toolbar";
import { EditorBubbleMenu } from "./bubble-menu";
import { AIPanel } from "./ai-panel";
import { SEOMeter } from "./seo-meter";
import { calculateReadability } from "./utils";
import { SEOAnalysis } from "@/lib/ai/types";

interface AdvancedEditorProps {
    content: string;
    onChange: (content: string) => void;
    title: string;
}

export function AdvancedEditor({ content, onChange, title }: AdvancedEditorProps) {
    const [isMobilePreview, setMobilePreview] = useState(false);
    const [showAIPanel, setShowAIPanel] = useState(true);
    const [seo, setSeo] = useState<SEOAnalysis>({ score: 0, suggestions: [], keywords: [] });
    const [readability, setReadability] = useState({ score: 0, level: "N/A" });

    const editor = useEditor({
        extensions: [
            StarterKit,
            Typography,
            Placeholder.configure({
                placeholder: "Start writing your masterpiece...",
            }),
            BubbleMenuExtension,
        ],
        content,
        editorProps: {
            attributes: {
                class: "prose prose-lg focus:outline-none max-w-none min-h-[500px] p-6",
            },
        },

        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange(html);
            // Debounce stats?
            setReadability(calculateReadability(editor.getText()));
        },
    });

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            editor?.destroy();
        };
    }, []);

    return (
        <div className="flex gap-4 h-[800px]">
            {/* MAIN EDITOR AREA */}
            <div className="flex-1 flex flex-col border rounded-lg shadow-sm bg-white overflow-hidden relative">
                <EditorToolbar
                    editor={editor}
                    isMobilePreview={isMobilePreview}
                    setMobilePreview={setMobilePreview}
                    onAIToggle={() => setShowAIPanel(!showAIPanel)}
                    isAIActive={showAIPanel}
                />

                {editor && <EditorBubbleMenu editor={editor} />}

                <div
                    className={`flex-1 overflow-y-auto bg-gray-50/30 transition-all duration-300 ${isMobilePreview ? "flex justify-center py-8" : ""
                        }`}
                >
                    <div
                        className={`bg-white shadow-sm transition-all duration-300 ${isMobilePreview
                            ? "w-[375px] h-[667px] overflow-y-auto rounded-3xl border-4 border-gray-800"
                            : "w-full min-h-full"
                            }`}
                    >
                        <EditorContent editor={editor} />
                    </div>
                </div>

                {/* FOOTER STATS */}
                <div className="border-t p-2 text-xs text-muted-foreground flex justify-between bg-white">
                    <span>{editor?.storage.characterCount?.words?.() || 0} words</span>
                    <span>Readability: {readability.level} ({readability.score})</span>
                </div>
            </div>

            {/* SIDEBAR */}
            {showAIPanel && (
                <div className="w-80 flex flex-col gap-4 h-full overflow-y-auto">
                    <SEOMeter score={seo.score} suggestions={seo.suggestions} />

                    <div className="border rounded-lg bg-white p-4 flex-1">
                        <AIPanel
                            editor={editor}
                            currentTitle={title}
                            onSEOUpdate={setSeo}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
