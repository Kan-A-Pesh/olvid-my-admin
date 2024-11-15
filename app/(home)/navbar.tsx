"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="flex w-full items-center p-4 bg-sidebar border-sidebar-border border-b">
            <SidebarTrigger />
            <span>{pathname}</span>
        </nav>
    );
}
