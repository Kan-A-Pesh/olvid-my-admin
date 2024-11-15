import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

interface SidebarMenuGroupProps<T> {
    title: string;
    data: T[];
    keyExtractor: (item: T, index: number) => string;
    item: (item: T) => React.ReactNode;
}

export default function SidebarMenuGroup<T>({ title, data, keyExtractor, item }: SidebarMenuGroupProps<T>) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{title}</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {data.map((e, index) => (
                        <SidebarMenuItem key={keyExtractor(e, index)}>{item(e)}</SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
