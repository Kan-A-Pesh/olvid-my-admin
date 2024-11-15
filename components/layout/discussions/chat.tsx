"use client";

import listMessages from "@/lib/messages/list-messages";
import useIdentityStore from "@/stores/identity";
import { useQuery } from "@tanstack/react-query";
import MessageContent from "./message-content";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatProps {
    discussionId: string;
}

export default function Chat({ discussionId }: ChatProps) {
    const identityId = useIdentityStore((state) => state.identity);

    const { data: messages } = useQuery({
        queryKey: ["messages", discussionId],
        queryFn: () => listMessages(identityId as string, discussionId),
        enabled: !!identityId,
    });

    console.log(messages);

    return (
        <div className="flex-1 justify-end min-h-0 overflow-y-auto flex flex-col gap-2 p-4 pb-0">
            {messages ? (
                messages.map((message) => (
                    <div key={"message:id:" + message.id + ":sortIndex:" + message.sortIndex} className="flex flex-col gap-1">
                        <MessageContent content={message.body} />
                    </div>
                ))
            ) : (
                <>
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-24 w-full" />
                </>
            )}
        </div>
    );
}
