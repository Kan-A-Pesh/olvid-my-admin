"use client";

import { Button } from "@/components/ui/button";
import { DataInvitation } from "@/types/invitation";
import { X } from "lucide-react";

interface InvitationsSentCardProps {
    invitation: DataInvitation;
    onDelete: () => unknown;
}

export default function InvitationsSentCard({ invitation, onDelete }: InvitationsSentCardProps) {
    return (
        <div className="flex flex-col gap-4 p-4 border border-gray-700 bg-gray-800 rounded-lg">
            <div className="flex gap-2 items-start justify-between w-full">
                <div className="flex flex-col gap-1 w-full">
                    <span className="font-bold">{invitation.displayName}</span>
                    <span className="text-sm text-opacity-50">{new Date(invitation.timestamp).toLocaleString()}</span>
                </div>
                <Button onClick={onDelete}>
                    <X />
                </Button>
            </div>
        </div>
    );
}
