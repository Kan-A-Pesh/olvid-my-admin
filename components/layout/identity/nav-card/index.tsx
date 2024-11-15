"use client";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { FormIdentityDetails } from "@/types/identity";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { ArrowLeftRight, ChevronsUpDown, Edit, PlusCircle, Trash, UserRoundPlus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import IdentityCard from "./identity-card";
import IdentityEditor from "../editor";
import { useState } from "react";
import useIdentityStore from "@/stores/identity";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import editIdentity from "@/lib/identity/edit-identity";
import listIdentities from "@/lib/identity/list-identities";
import createIdentity from "@/lib/identity/create-identity";
import deleteIdentity from "@/lib/identity/delete-identity";

export default function IdentityNav() {
    const isMobile = useIsMobile();
    const identityStore = useIdentityStore();
    const client = useQueryClient();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { isPending, data: identities } = useQuery({
        queryKey: ["identities"],
        queryFn: listIdentities,
    });

    const createMutation = useMutation({
        mutationFn: async (data: FormIdentityDetails) => {
            return await createIdentity(data);
        },

        onSuccess: (id) => {
            client.invalidateQueries({ queryKey: ["identities"] });
            identityStore.setIdentity(id);
            setIsCreateModalOpen(false);
        },
    });

    const editMutation = useMutation({
        mutationFn: async (data: FormIdentityDetails) => {
            await editIdentity(identityStore.identity as string, data);
        },
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["identities"] });
            setIsEditModalOpen(false);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async () => {
            await deleteIdentity(identityStore.identity as string);
        },
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["identities"] });
            identityStore.setIdentity(null);
        },
    });

    if (isPending) return <Skeleton className="h-12 w-full" />; // Loading identity
    if (!identities) return null; // Identity not found

    const identity = (identityStore.identity && identities[identityStore.identity]) ?? null;

    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                {identity ? <IdentityCard identity={identity} /> : <span>Not connected</span>}
                                <ChevronsUpDown className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            side={isMobile ? "bottom" : "right"}
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="p-2 font-normal">
                                {identity ? <IdentityCard identity={identity} /> : <span>Not connected</span>}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href="/invitations">
                                <DropdownMenuItem>
                                    <UserRoundPlus />
                                    <span>Invitations</span>
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <ArrowLeftRight />
                                    <span>Switch identity</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        {Object.entries(identities).map((value) => (
                                            <DropdownMenuItem key={value[1].id} onClick={() => identityStore.setIdentity(value[0])}>
                                                <span>{value[1].displayName}</span>
                                            </DropdownMenuItem>
                                        ))}
                                        {Object.keys(identities).length > 0 && <DropdownMenuSeparator />}
                                        <DropdownMenuItem onClick={() => setIsCreateModalOpen(true)}>
                                            <PlusCircle />
                                            <span>Create identity</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>

                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
                                    <Edit />
                                    Edit
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="text-red-500" onClick={() => deleteMutation.mutate()}>
                                    <Trash />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>

            <IdentityEditor
                key={"create:" + Object.keys(identities).length}
                isOpen={isCreateModalOpen}
                setIsOpen={setIsCreateModalOpen}
                onSubmit={createMutation.mutate}
                content={{ title: "Create identity", description: "Create a new identity", submit: "Create" }}
            />

            {identity && (
                <IdentityEditor
                    key={"edit:" + identity.id}
                    isOpen={isEditModalOpen}
                    setIsOpen={setIsEditModalOpen}
                    defaultValues={{ firstName: "", ...identity }}
                    onSubmit={editMutation.mutate}
                    content={{
                        title: "Edit identity",
                        description: "Edit your identity details.",
                        submit: "Save",
                    }}
                />
            )}
        </>
    );
}
