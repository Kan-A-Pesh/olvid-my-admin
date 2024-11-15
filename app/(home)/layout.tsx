import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./sidebar";
import Navbar from "./navbar";

export default async function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 flex flex-col">
                <Navbar />
                <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">{children}</div>
            </main>
        </SidebarProvider>
    );
}
