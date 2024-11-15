"use client";

import IdentityEditor from "@/components/layout/identity/editor";
import { Button } from "@/components/ui/button";
import createIdentityMutation from "@/hooks/mutations/identities/create";
import { useState } from "react";

export default function IdentityCreator() {
    const [open, setOpen] = useState(false);
    const createIdentity = createIdentityMutation();

    return (
        <>
            <Button onClick={() => setOpen(true)}>Create your first identity</Button>

            <IdentityEditor
                isOpen={open}
                setIsOpen={setOpen}
                onSubmit={createIdentity.mutate}
                content={{ title: "Create identity", description: "Create a new identity", submit: "Create" }}
            />
        </>
    );
}
