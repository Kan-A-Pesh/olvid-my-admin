"use client";

import { Button } from "@/components/ui/button";
import sendMessage from "@/lib/messages/send-message";
import useIdentityStore from "@/stores/identity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Send } from "lucide-react";
import { Markdown } from "tiptap-markdown";

interface MessageBoxInputProps {
    discussionId: string;
}

export default function MessageBoxInput({ discussionId }: MessageBoxInputProps) {
    const identityId = useIdentityStore((state) => state.identity);
    const client = useQueryClient();

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

    const sendMutation = useMutation({
        mutationFn: async () => {
            if (!editor || !identityId) return;
            const content = editor.storage.markdown.getMarkdown();
            return await sendMessage(identityId, discussionId, content);
        },
        onSuccess: () => {
            editor?.commands.clearContent();
            client.invalidateQueries({ queryKey: ["messages", discussionId] });
        },
    });

    return (
        <div className="flex p-4 gap-2 items-end">
            <div className="flex items-center w-full rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 min-h-9">
                <EditorContent
                    className="px-4 py-2 w-full outline-none border-none"
                    editor={editor}
                    onKeyDown={(e) => e.key === "Enter" && sendMutation.mutate()}
                />
            </div>
            <Button type="submit" onClick={() => sendMutation.mutate()} disabled={sendMutation.isPending}>
                <Send />
                Send
            </Button>
        </div>
    );
}
