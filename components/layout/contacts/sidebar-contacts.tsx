"use client";

import { Skeleton } from "@/components/ui/skeleton";
import listContacts from "@/lib/contacts/list-contacts";
import useIdentityStore from "@/stores/identity";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SidebarMenuGroup from "../sidebar/sidebar-menu-group";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import createDiscussion from "@/lib/discussions/create-discussion";
import { useRouter } from "next/navigation";

export default function SidebarContacts() {
    const identityId = useIdentityStore((state) => state.identity);
    const client = useQueryClient();
    const router = useRouter();

    const { data: contacts, isPending } = useQuery({
        queryKey: ["contacts"],
        queryFn: () => listContacts(identityId as string),
        enabled: !!identityId,
    });

    const createMutation = useMutation({
        mutationFn: async (contactId: string) => {
            return await createDiscussion(identityId as string, contactId);
        },
        onSuccess: (discussion) => {
            client.invalidateQueries({ queryKey: ["discussions"] });
            router.push(`/discussions/${discussion.id}`);
        },
    });

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
                <SidebarMenuButton asChild onClick={() => createMutation.mutate(contact.id)}>
                    <span className="truncate">{contact.displayName}</span>
                </SidebarMenuButton>
            )}
        />
    );
}
