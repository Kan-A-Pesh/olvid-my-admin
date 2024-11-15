"use client";

import SendInvitationDialog from "@/components/layout/invitation/send-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import getInvitationLink from "@/lib/invitations/get-invitation-link";
import sendInvitation from "@/lib/invitations/send-invitation";
import useIdentityStore from "@/stores/identity";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function InvitationsAddCard() {
    const identityStore = useIdentityStore();
    const toast = useToast();
    const [isOpen, setIsOpen] = useState(false);

    const { data: myUrl } = useQuery({
        queryKey: ["my-url"],
        queryFn: () => getInvitationLink(identityStore.identity as string),
        enabled: !!identityStore.identity,
    });

    const client = useQueryClient();
    const sendMutation = useMutation({
        mutationFn: async (url: string) => {
            if (!identityStore.identity) return;
            return await sendInvitation(identityStore.identity, url);
        },
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["invitations"] });
            setIsOpen(false);
        },
        onError: () => {
            setIsOpen(false);
            toast.toast({
                variant: "destructive",
                title: "Oops",
                description: "The invitation link is invalid",
            });
        },
    });

    return (
        <>
            <div className="flex items-center justify-between gap-4 p-4 border border-blue-500 bg-blue-950 rounded-lg">
                <div className="flex flex-col gap-1">
                    <h1 className="font-bold leading-none text-blue-50">Olvid is funnier with friends!</h1>
                    <p className="text-sm text-blue-200 leading-none">Let&apos;s send some invites and start connecting with others</p>
                </div>

                <Button onClick={() => setIsOpen(true)} disabled={!identityStore.identity}>
                    Send Invitation
                </Button>
            </div>

            <SendInvitationDialog isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={sendMutation.mutate} myUrl={myUrl || null} />
        </>
    );
}
