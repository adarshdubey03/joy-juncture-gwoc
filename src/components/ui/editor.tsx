"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered, Underline as UnderlineIcon, Link as LinkIcon, Undo, Redo } from "lucide-react";

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

const Editor = ({
    value,
    onChange,
    disabled
}: EditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
            })
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editable: !disabled,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[150px]',
            },
        },

    });

    if (!editor) {
        return null;
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        // update
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };


    return (
        <div className="bg-white rounded-md border border-input">
            <div className="flex flex-wrap items-center gap-1 border-b p-1 bg-neutral-50 rounded-t-md">
                <Button variant={editor.isActive('bold') ? "secondary" : "ghost"} size="sm" onClick={() => editor.chain().focus().toggleBold().run()} type="button" disabled={disabled}>
                    <Bold className="h-4 w-4" />
                </Button>
                <Button variant={editor.isActive('italic') ? "secondary" : "ghost"} size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} type="button" disabled={disabled}>
                    <Italic className="h-4 w-4" />
                </Button>
                <Button variant={editor.isActive('underline') ? "secondary" : "ghost"} size="sm" onClick={() => editor.chain().focus().toggleUnderline().run()} type="button" disabled={disabled}>
                    <UnderlineIcon className="h-4 w-4" />
                </Button>
                <div className="w-[1px] h-6 bg-neutral-200 mx-1" />
                <Button variant={editor.isActive('bulletList') ? "secondary" : "ghost"} size="sm" onClick={() => editor.chain().focus().toggleBulletList().run()} type="button" disabled={disabled}>
                    <List className="h-4 w-4" />
                </Button>
                <Button variant={editor.isActive('orderedList') ? "secondary" : "ghost"} size="sm" onClick={() => editor.chain().focus().toggleOrderedList().run()} type="button" disabled={disabled}>
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <div className="w-[1px] h-6 bg-neutral-200 mx-1" />
                <Button variant={editor.isActive('link') ? "secondary" : "ghost"} size="sm" onClick={setLink} type="button" disabled={disabled}>
                    <LinkIcon className="h-4 w-4" />
                </Button>
                <div className="w-[1px] h-6 bg-neutral-200 mx-1 ml-auto" />
                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()} type="button" disabled={disabled}>
                    <Undo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()} type="button" disabled={disabled}>
                    <Redo className="h-4 w-4" />
                </Button>
            </div>
            <div className="p-3 min-h-[150px]">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default Editor;
