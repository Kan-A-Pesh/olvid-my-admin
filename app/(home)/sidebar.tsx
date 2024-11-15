"use server";

import IdentityNav from "@/components/layout/identity/nav-card";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";

export default async function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader></SidebarHeader>
            <SidebarContent></SidebarContent>
            <SidebarFooter>
                <IdentityNav />
            </SidebarFooter>
        </Sidebar>
    );
}
