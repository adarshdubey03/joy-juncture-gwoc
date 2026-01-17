"use client";

import { type Editor } from "@tiptap/react";
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Heading2, // Changed from Heading1 to match the logic
    Heading3, // Changed from Heading2 to match the logic
    Smartphone,
    Monitor,
    Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface EditorToolbarProps {
    editor: Editor | null;
    isMobilePreview: boolean;
    setMobilePreview: (v: boolean) => void;
    onAIToggle: () => void;
    isAIActive: boolean;
}

export function EditorToolbar({ editor, isMobilePreview, setMobilePreview, onAIToggle, isAIActive }: EditorToolbarProps) {
    if (!editor) return null;

    return (
        <div className="border-b bg-gray-50 p-2 flex items-center justify-between flex-wrap gap-2 sticky top-0 z-10">
            <div className="flex items-center gap-1">
                {/* Text Formatting */}
                <Button
                    type="button"
                    variant={editor.isActive("bold") ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    title="Bold"
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive("italic") ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    title="Italic"
                >
                    <Italic className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* Headings - Fixed Icon/Level Mismatch */}
                <Button
                    type="button"
                    variant={editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    title="Heading 2"
                >
                    {/* Used Heading2 icon for H2 */}
                    <Heading2 className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive("heading", { level: 3 }) ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    title="Heading 3"
                >
                    {/* Used Heading3 icon for H3 */}
                    <Heading3 className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* Lists */}
                <Button
                    type="button"
                    variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    title="Bullet List"
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    title="Ordered List"
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    title="Quote"
                >
                    <Quote className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex items-center gap-2">
                {/* AI Trigger */}
                <Button
                    type="button"
                    variant={isAIActive ? "secondary" : "outline"}
                    size="sm"
                    className={`${isAIActive ? "bg-purple-100 text-purple-700 border-purple-300" : "text-grey-600 border-grey-200 hover:bg-purple-50"}`}
                    onClick={onAIToggle}
                >
                    <Sparkles className={`h-4 w-4 mr-2 ${isAIActive ? "fill-purple-700" : ""}`} />
                    AI Assistant
                </Button>

                <Separator orientation="vertical" className="h-6" />

                {/* View Modes */}
                <Button
                    variant={!isMobilePreview ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setMobilePreview(false)}
                    title="Desktop View"
                >
                    <Monitor className="h-4 w-4" />
                </Button>
                <Button
                    variant={isMobilePreview ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setMobilePreview(true)}
                    title="Mobile View"
                >
                    <Smartphone className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}