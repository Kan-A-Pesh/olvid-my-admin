import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Navbar() {
    return (
        <nav className="flex w-full items-center p-4 bg-sidebar border-sidebar-border border-b">
            <SidebarTrigger />
        </nav>
    );
}
