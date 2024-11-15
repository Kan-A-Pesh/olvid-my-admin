"use server";

import Chat from "@/components/layout/discussions/chat";
import MessageBoxInput from "@/components/layout/discussions/message-box-input";

interface DiscussionPageProps {
    params: Promise<{ id: string }>;
}

export default async function DiscussionPage({ params }: DiscussionPageProps) {
    const { id } = await params;

    return (
        <section className="flex flex-col flex-1 justify-end">
            <Chat discussionId={id} />
            <MessageBoxInput discussionId={id} />
        </section>
    );
}
