"use client";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import useIdentityStore from "@/stores/identity";
import { datatypes } from "@olvid/bot-node";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { IdentityCreator } from "../creator";

interface ClientIdentitySelectorProps {
    identities: datatypes.Identity[];
}

export default function ClientIdentitySelector({ identities }: ClientIdentitySelectorProps) {
    const identityStore = useIdentityStore();
    const usedIdentity = identities.find((identity) => identity.id === identityStore.identity);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                    {usedIdentity ? usedIdentity.displayName : "No identity"}
                    <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                {identities.map(
                    (identity) =>
                        identity.id !== identityStore.identity && (
                            <DropdownMenuItem key={identity.id} onClick={() => identityStore.setIdentity(identity.id)}>
                                <span>{identity.displayName}</span>
                            </DropdownMenuItem>
                        ),
                )}
                <DropdownMenuSeparator />
                <IdentityCreator trigger={<DropdownMenuItem>New identity</DropdownMenuItem>} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
