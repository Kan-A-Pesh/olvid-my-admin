"use server";

import Chat from "@/components/layout/discussions/chat";
import MessageBoxInput from "@/components/layout/discussions/message-box-input";

export default async function DiscussionPage({ params }: { params: Promise<{ identityId: string; discussionId: string }> }) {
    const { identityId, discussionId } = await params;

    return (
        <section className="flex flex-col flex-1 justify-end">
            <Chat identityId={identityId} discussionId={discussionId} />
            <MessageBoxInput identityId={identityId} discussionId={discussionId} />
        </section>
    );
}
