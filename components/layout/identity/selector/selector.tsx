"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import useIdentityStore from "@/stores/identity";
import { ChevronDown } from "lucide-react";
import { IdentityCreator } from "../creator";
import { DataIdentity, FormIdentityDetails } from "@/types/form/identity";
import { startTransition, useState } from "react";
import createIdentity from "../creator/create-identity";
import { useRouter } from "next/navigation";

interface ClientIdentitySelectorProps {
    identities: {
        [key: string]: DataIdentity;
    };
}

export default function ClientIdentitySelector({ identities }: ClientIdentitySelectorProps) {
    const identityStore = useIdentityStore();

    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async (data: FormIdentityDetails) => {
        const id = await createIdentity(data);

        startTransition(() => {
            router.refresh();
            identityStore.setIdentity(id);
            setIsOpen(false);
        });
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                        {(identityStore.identity && identities[identityStore.identity]?.displayName) || "No identity"}
                        <ChevronDown className="ml-auto" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                    {Object.entries(identities).map((value) => (
                        <DropdownMenuItem key={value[1].id} onClick={() => identityStore.setIdentity(value[0])}>
                            <span>{value[1].displayName}</span>
                        </DropdownMenuItem>
                    ))}
                    {Object.keys(identities).length > 0 && <DropdownMenuSeparator />}
                    <DropdownMenuItem onClick={() => setIsOpen(true)}>
                        <span>Create identity</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <IdentityCreator isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={handleSubmit} />
        </>
    );
}
