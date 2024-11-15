"use client";

import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { DataInvitation } from "@/types/invitation";
import { X } from "lucide-react";
import { useState } from "react";

interface InvitationsOngoingCardProps {
    invitation: DataInvitation;
    onSubmit: (sas: string) => unknown;
    onDelete: () => unknown;
}

export default function InvitationsOngoingCard({ invitation, onSubmit, onDelete }: InvitationsOngoingCardProps) {
    const [sas, setSas] = useState("");

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
            <div className="flex gap-1 w-full items-center justify-center bg-gray-950 rounded-md p-2">
                <InputOTP maxLength={4} onChange={(sas) => setSas(sas)} value={sas}>
                    <InputOTPGroup>
                        {invitation.sas.split("").map((char, index) => (
                            <div
                                key={"otp:" + index}
                                className="relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md"
                            >
                                {char}
                            </div>
                        ))}
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                    </InputOTPGroup>
                </InputOTP>
                <Button onClick={() => onSubmit(sas)}>Confirm</Button>
            </div>
        </div>
    );
}
