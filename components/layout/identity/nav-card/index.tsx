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
import { useMutation, useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import editIdentity from "@/lib/identity/edit-identity";
import listIdentities from "@/lib/identity/list-identities";
import deleteIdentity from "@/lib/identity/delete-identity";
import createIdentityMutation from "@/hooks/mutations/identities/create";
import editIdentityMutation from "@/hooks/mutations/identities/edit";
import deleteIdentityMutation from "@/hooks/mutations/identities/delete";

export default function IdentityNav({ identityId }: { identityId: string }) {
    const isMobile = useIsMobile();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { isPending, data: identities } = useQuery({
        queryKey: ["identities"],
        queryFn: listIdentities,
    });

    const createIdentity = createIdentityMutation();
    const editIdentity = editIdentityMutation(identityId, setIsEditModalOpen);
    const deleteIdentity = deleteIdentityMutation(identityId);

    if (isPending) return <Skeleton className="h-12 w-full" />; // Loading identity
    if (!identities) return null; // Identity not found

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
                                <IdentityCard identity={identities[identityId]} />
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
                                <IdentityCard identity={identities[identityId]} />
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href={`/${identityId}/invitations`}>
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
                                            <Link key={value[0]} href={`/${value[0]}`}>
                                                <DropdownMenuItem>
                                                    <span>{value[1].displayName}</span>
                                                </DropdownMenuItem>
                                            </Link>
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
                                <DropdownMenuItem className="text-red-500" onClick={() => deleteIdentity.mutate()}>
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
                onSubmit={createIdentity.mutate}
                content={{ title: "Create identity", description: "Create a new identity", submit: "Create" }}
            />

            <IdentityEditor
                key={"edit:" + identityId}
                isOpen={isEditModalOpen}
                setIsOpen={setIsEditModalOpen}
                defaultValues={{ firstName: "", ...identities[identityId] }}
                onSubmit={editIdentity.mutate}
                content={{
                    title: "Edit identity",
                    description: "Edit your identity details.",
                    submit: "Save",
                }}
            />
        </>
    );
}
