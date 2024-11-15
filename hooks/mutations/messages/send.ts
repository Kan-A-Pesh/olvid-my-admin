import sendMessage from "@/lib/messages/send-message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Editor } from "@tiptap/react";

export default function sendMessageMutation(identityId: string, discussionId: string) {
    const client = useQueryClient();

    return useMutation({
        mutationFn: async (editor: Editor | null) => {
            if (!editor) return;

            const content = editor.storage.markdown.getMarkdown();
            await sendMessage(identityId, discussionId, content);
            return editor;
        },
        onSuccess: (editor) => {
            editor?.commands.clearContent();
            client.invalidateQueries({ queryKey: ["messages", discussionId] });
        },
    });
}
