import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";

interface MessageContentProps {
    content: string;
}

export default function MessageContent({ content }: MessageContentProps) {
    const editor = useEditor({
        content: content,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Markdown,
        ],
    });

    return <EditorContent readOnly editor={editor} />;
}
