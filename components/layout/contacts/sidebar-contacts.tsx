"use client";

import { Skeleton } from "@/components/ui/skeleton";
import listContacts from "@/lib/contacts/list-contacts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SidebarMenuGroup from "../sidebar/sidebar-menu-group";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import createDiscussion from "@/lib/discussions/create-discussion";
import { useRouter } from "next/navigation";
import createDiscussionMutation from "@/hooks/mutations/discussions/create";
import { useItemsQuery } from "@/hooks/use-item-query";

interface SidebarContactsProps {
    identityId: string;
}

export default function SidebarContacts({ identityId }: SidebarContactsProps) {
    const { data: contacts, isPending } = useItemsQuery({
        queryKey: ["contacts"],
        queryFn: () => listContacts(identityId as string),
    });

    const createDiscussion = createDiscussionMutation(identityId);

    if (isPending || !contacts) {
        return (
            <SidebarMenuGroup
                title="Contacts"
                data={Array.from({ length: 5 })}
                keyExtractor={(_, index) => index.toString()}
                item={() => <Skeleton className="h-8 w-full" />}
            />
        );
    }

    return (
        <SidebarMenuGroup
            title="Contacts"
            data={Object.values(contacts)}
            keyExtractor={(contact) => contact.id}
            item={(contact) => (
                <SidebarMenuButton asChild onClick={() => createDiscussion.mutate(contact.id)}>
                    <span className="truncate">{contact.displayName}</span>
                </SidebarMenuButton>
            )}
        />
    );
}
