"use client";

import useIdentityStore from "@/stores/identity";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataInvitation } from "@/types/invitation";
import InvitationsOngoingCard from "@/components/layout/invitation/ongoing-card";
import listInvitations from "@/lib/invitations/list-invitations";
import { Skeleton } from "@/components/ui/skeleton";
import InvitationsReceivedCard from "@/components/layout/invitation/received-card";
import manageInvitation from "@/lib/invitations/manage-invitation";
import sasInvitation from "@/lib/invitations/sas-invitation";
import { useToast } from "@/hooks/use-toast";
import deleteInvitation from "@/lib/invitations/delete-invitation";
import InvitationsSentCard from "@/components/layout/invitation/sent-card";

export default function Invitations() {
    const identityId = useIdentityStore((state) => state.identity);
    const client = useQueryClient();
    const toast = useToast();

    const { isPending, data: invitations } = useQuery({
        queryKey: ["invitations"],
        queryFn: () => listInvitations(identityId as string),
        enabled: !!identityId,
    });

    const { received, sent, ongoing, unknown } = Object.values(invitations || {}).reduce(
        (acc, invitation) => {
            acc[invitation.status] = [...acc[invitation.status], invitation];
            return acc;
        },
        {
            received: [] as DataInvitation[],
            sent: [] as DataInvitation[],
            ongoing: [] as DataInvitation[],
            unknown: [] as DataInvitation[],
        },
    );

    const manageMutation = useMutation({
        mutationFn: async ({ invitationId, accepted }: { invitationId: string; accepted: boolean }) => {
            return await manageInvitation(identityId as string, invitationId, accepted);
        },
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["invitations"] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (invitationId: string) => {
            return await deleteInvitation(identityId as string, invitationId);
        },
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["invitations"] });
        },
    });

    const sasMutation = useMutation({
        mutationFn: async ({ invitationId, sas }: { invitationId: string; sas: string }) => {
            return await sasInvitation(identityId as string, invitationId, sas);
        },
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["invitations"] });
            client.invalidateQueries({ queryKey: ["conversations"] });
            toast.toast({
                title: "Correct!",
                description: "The SAS code is correct",
            });
        },
    });

    if (isPending) {
        return (
            <div>
                <Skeleton className="h-6 mb-2 w-48" />
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <Skeleton className="h-24" />
                    <Skeleton className="h-24" />
                    <Skeleton className="h-24" />
                </section>
            </div>
        );
    }

    if (!identityId) return;

    return (
        <>
            {ongoing.length > 0 && (
                <div>
                    <h2 className="font-bold mb-2">
                        Ongoing Invitations <span className="text-xs text-opacity-50">({ongoing.length})</span>
                    </h2>
                    <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        {ongoing.map((invitation) => (
                            <InvitationsOngoingCard
                                key={invitation.id}
                                invitation={invitation}
                                onSubmit={(sas) => sasMutation.mutate({ invitationId: invitation.id, sas })}
                                onDelete={() => deleteMutation.mutate(invitation.id)}
                            />
                        ))}
                    </section>
                </div>
            )}

            {received.length > 0 && (
                <div>
                    <h2 className="font-bold mb-2">
                        Received Invitations <span className="text-xs text-opacity-50">({received.length})</span>
                    </h2>
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {received.map((invitation) => (
                            <InvitationsReceivedCard
                                key={invitation.id}
                                invitation={invitation}
                                onAccept={() => manageMutation.mutate({ invitationId: invitation.id, accepted: true })}
                                onDecline={() => manageMutation.mutate({ invitationId: invitation.id, accepted: false })}
                            />
                        ))}
                    </section>
                </div>
            )}

            {sent.length > 0 && (
                <div>
                    <h2 className="font-bold mb-2">
                        Sent Invitations <span className="text-xs text-opacity-50">({sent.length})</span>
                    </h2>
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {sent.map((invitation) => (
                            <InvitationsSentCard
                                key={invitation.id}
                                invitation={invitation}
                                onDelete={() => deleteMutation.mutate(invitation.id)}
                            />
                        ))}
                    </section>
                </div>
            )}

            {unknown.length > 0 && (
                <div>
                    <h2 className="font-bold opacity-25">Oops, it seems you have {unknown.length} invitations in an unknown state</h2>
                </div>
            )}
        </>
    );
}
