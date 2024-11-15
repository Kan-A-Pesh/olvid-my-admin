"use client";

import { Button } from "@/components/ui/button";
import sendMessageMutation from "@/hooks/mutations/messages/send";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Send } from "lucide-react";
import { Markdown } from "tiptap-markdown";

interface MessageBoxInputProps {
    identityId: string;
    discussionId: string;
}

export default function MessageBoxInput({ identityId, discussionId }: MessageBoxInputProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Markdown,
        ],
        content: "",
    });

    const sendMessage = sendMessageMutation(identityId, discussionId);

    return (
        <div className="flex p-4 gap-2 items-end">
            <div className="flex items-center w-full rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 min-h-9">
                <EditorContent
                    className="px-4 py-2 w-full outline-none border-none"
                    editor={editor}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage.mutate(editor)}
                />
            </div>
            <Button type="submit" onClick={() => sendMessage.mutate(editor)} disabled={sendMessage.isPending}>
                <Send />
                Send
            </Button>
        </div>
    );
}
