"use client";

import { Skeleton } from "@/components/ui/skeleton";
import listDiscussions from "@/lib/discussions/list-discussions";
import SidebarMenuGroup from "../sidebar/sidebar-menu-group";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useItemsQuery } from "@/hooks/use-item-query";
import createDiscussionMutation from "@/hooks/mutations/discussions/create";

interface SidebarDiscussionsProps {
    identityId: string;
}

export default function SidebarDiscussions({ identityId }: SidebarDiscussionsProps) {
    const { data: discussions, isPending } = useItemsQuery({
        queryKey: ["discussions"],
        queryFn: () => listDiscussions(identityId),
    });

    const createDiscussion = createDiscussionMutation(identityId);

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
                <SidebarMenuButton asChild onClick={() => createDiscussion.mutate(discussion.id)}>
                    <span className="truncate">{discussion.title}</span>
                </SidebarMenuButton>
            )}
        />
    );
}
