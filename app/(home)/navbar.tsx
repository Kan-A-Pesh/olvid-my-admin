import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Navbar() {
    return (
        <nav className="flex w-full items-center p-4 bg-slate-800">
            <SidebarTrigger />
        </nav>
    );
}
