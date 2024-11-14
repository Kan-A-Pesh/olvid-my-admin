import IdentitySelector from "@/components/layout/identity/selector";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export async function AppSidebar() {
    return (
        <Sidebar className="bg-slate-800">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <IdentitySelector />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
