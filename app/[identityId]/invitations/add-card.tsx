"use client";

import SendInvitationDialog from "@/components/layout/invitation/send-dialog";
import { Button } from "@/components/ui/button";
import sendInvitationMutation from "@/hooks/mutations/invitations/send";
import getInvitationLink from "@/lib/invitations/get-invitation-link";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface InvitationAddCardProps {
    identityId: string;
}

export default function InvitationsAddCard({ identityId }: InvitationAddCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    const { data: myUrl } = useQuery({
        queryKey: ["my-url"],
        queryFn: () => getInvitationLink(identityId),
    });

    const sendInvitation = sendInvitationMutation(identityId, setIsOpen);

    return (
        <>
            <div className="flex items-center justify-between gap-4 p-4 border border-blue-500 bg-blue-950 rounded-lg">
                <div className="flex flex-col gap-1">
                    <h1 className="font-bold leading-none text-blue-50">Olvid is funnier with friends!</h1>
                    <p className="text-sm text-blue-200 leading-none">Let&apos;s send some invites and start connecting with others</p>
                </div>

                <Button onClick={() => setIsOpen(true)}>Send Invitation</Button>
            </div>

            <SendInvitationDialog isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={sendInvitation.mutate} myUrl={myUrl || null} />
        </>
    );
}
