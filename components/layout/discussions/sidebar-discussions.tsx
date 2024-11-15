"use client";

import { Skeleton } from "@/components/ui/skeleton";
import listDiscussions from "@/lib/discussions/list-discussions";
import useIdentityStore from "@/stores/identity";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SidebarMenuGroup from "../sidebar/sidebar-menu-group";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import createDiscussion from "@/lib/discussions/create-discussion";
import { useRouter } from "next/navigation";

export default function SidebarDiscussions() {
    const identityId = useIdentityStore((state) => state.identity);
    const client = useQueryClient();
    const router = useRouter();

    const { data: discussions, isPending } = useQuery({
        queryKey: ["discussions"],
        queryFn: () => listDiscussions(identityId as string),
        enabled: !!identityId,
    });

    const createMutation = useMutation({
        mutationFn: async (discussionId: string) => {
            return await createDiscussion(identityId as string, discussionId);
        },
        onSuccess: (discussion) => {
            client.invalidateQueries({ queryKey: ["discussions"] });
            router.push(`/discussions/${discussion.id}`);
        },
    });

    if (isPending || !discussions) {
        return (
            <SidebarMenuGroup
                title="Discussions"
                data={Array.from({ length: 5 })}
                keyExtractor={(_, index) => index.toString()}
                item={() => <Skeleton className="h-8 w-full" />}
            />
        );
    }

    return (
        <SidebarMenuGroup
            title="Discussions"
            data={Object.values(discussions)}
            keyExtractor={(discussion) => discussion.id}
            item={(discussion) => (
                <SidebarMenuButton asChild onClick={() => createMutation.mutate(discussion.id)}>
                    <span className="truncate">{discussion.title}</span>
                </SidebarMenuButton>
            )}
        />
    );
}
