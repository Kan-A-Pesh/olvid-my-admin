"use client";

import { Button } from "@/components/ui/button";
import { DataInvitation } from "@/types/invitation";

interface InvitationsReceivedCardProps {
    invitation: DataInvitation;
    onAccept: () => unknown;
    onDecline: () => unknown;
}

export default function InvitationsReceivedCard({ invitation, onAccept, onDecline }: InvitationsReceivedCardProps) {
    return (
        <div className="flex flex-col gap-4 p-4 border border-gray-700 bg-gray-800 rounded-lg">
            <div className="flex flex-col gap-1 w-full">
                <span className="font-bold">{invitation.displayName}</span>
                <span className="text-sm text-opacity-50">{new Date(invitation.timestamp).toLocaleString()}</span>
            </div>
            <div className="flex gap-1 w-full items-center">
                <Button onClick={onAccept}>Accept</Button>
                <Button onClick={onDecline} variant="ghost">
                    Decline
                </Button>
            </div>
        </div>
    );
}
