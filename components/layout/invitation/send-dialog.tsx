"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface IdentityCreatorProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    onSubmit: (url: string) => Promise<unknown> | unknown;
    myUrl: string | null;
}

export default function SendInvitationDialog({ isOpen, setIsOpen, onSubmit, myUrl }: IdentityCreatorProps) {
    const [url, setUrl] = useState("");
    const toast = useToast();

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Send invitation</DialogTitle>
                    <DialogDescription>Send a contact request to your friends</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="grid gap-1.5">
                        <Label>My invite link</Label>
                        {myUrl ? (
                            <div className="flex items-center gap-2">
                                <Input value={myUrl} readOnly />
                                <Button
                                    onClick={() => {
                                        navigator.clipboard
                                            .writeText(myUrl)
                                            .then(() => toast.toast({ title: "Copied to clipboard" }))
                                            .catch(() => toast.toast({ variant: "destructive", title: "Failed to copy to clipboard" }));
                                    }}
                                >
                                    Copy
                                </Button>
                            </div>
                        ) : (
                            <Skeleton className="h-6 w-full" />
                        )}
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="link">Invite someone</Label>
                        <div className="flex items-center gap-2">
                            <Input id="link" value={url} onChange={(e) => setUrl(e.target.value)} />
                            <Button type="submit" onClick={() => onSubmit(url)}>
                                Send
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
