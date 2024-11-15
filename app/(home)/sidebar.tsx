"use server";

import SidebarContacts from "@/components/layout/contacts/sidebar-contacts";
import SidebarDiscussions from "@/components/layout/discussions/sidebar-discussions";
import IdentityNav from "@/components/layout/identity/nav-card";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";

export default async function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader></SidebarHeader>
            <SidebarContent>
                <SidebarDiscussions />
                <SidebarContacts />
            </SidebarContent>
            <SidebarFooter>
                <IdentityNav />
            </SidebarFooter>
        </Sidebar>
    );
}
