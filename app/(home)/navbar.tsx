"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import listDiscussions from "@/lib/discussions/list-discussions";
import useIdentityStore from "@/stores/identity";
import { useQuery } from "@tanstack/react-query";
import { CircleHelp, Home, MessageCircle, UserRoundPlus } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const identityId = useIdentityStore((state) => state.identity);
    const { data: discussions, isPending } = useQuery({
        queryKey: ["discussions"],
        queryFn: () => listDiscussions(identityId as string),
        enabled: !!identityId && pathname.startsWith("/discussions/"),
    });

    let breadcrumb = null;

    if (!pathname) {
        breadcrumb = null;
    } else if (pathname === "/") {
        breadcrumb = (
            <>
                <Home className="mr-2" />
                <span>Home</span>
            </>
        );
    } else if (pathname === "/invitations") {
        breadcrumb = (
            <>
                <UserRoundPlus className="mr-2" />
                <span>Invitations</span>
            </>
        );
    } else if (pathname.startsWith("/discussions/")) {
        const discussionId = pathname.split("/")[2];
        const title = discussions?.[discussionId]?.title;
        breadcrumb = (
            <>
                <MessageCircle className="mr-2" />
                <span>{title || "N/A"}</span>
            </>
        );
    } else {
        breadcrumb = (
            <>
                <CircleHelp className="mr-2" />
                <span>N/A</span>
            </>
        );
    }

    return (
        <nav className="flex w-full items-center p-4 bg-sidebar border-sidebar-border border-b">
            <SidebarTrigger className="mr-4" />
            {breadcrumb}
        </nav>
    );
}
