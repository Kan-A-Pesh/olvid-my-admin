import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./sidebar";
import Navbar from "./navbar";

export default async function AppLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ identityId: string }>;
}>) {
    const { identityId } = await params;

    return (
        <SidebarProvider>
            <AppSidebar identityId={identityId} />
            <main className="flex-1 flex flex-col">
                <Navbar identityId={identityId} />
                <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">{children}</div>
            </main>
        </SidebarProvider>
    );
}
