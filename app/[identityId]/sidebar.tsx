"use server";

import SidebarContacts from "@/components/layout/contacts/sidebar-contacts";
import SidebarDiscussions from "@/components/layout/discussions/sidebar-discussions";
import IdentityNav from "@/components/layout/identity/nav-card";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";

interface AppSidebarProps {
    identityId: string;
}

export default async function AppSidebar({ identityId }: AppSidebarProps) {
    return (
        <Sidebar>
            <SidebarHeader></SidebarHeader>
            <SidebarContent>
                <SidebarDiscussions identityId={identityId} />
                <SidebarContacts identityId={identityId} />
            </SidebarContent>
            <SidebarFooter>
                <IdentityNav identityId={identityId} />
            </SidebarFooter>
        </Sidebar>
    );
}
