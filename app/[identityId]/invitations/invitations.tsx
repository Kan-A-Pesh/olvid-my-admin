"use client";

import { DataInvitation } from "@/types/invitation";
import InvitationsOngoingCard from "@/components/layout/invitation/ongoing-card";
import listInvitations from "@/lib/invitations/list-invitations";
import { Skeleton } from "@/components/ui/skeleton";
import InvitationsReceivedCard from "@/components/layout/invitation/received-card";
import InvitationsSentCard from "@/components/layout/invitation/sent-card";
import { useItemsQuery } from "@/hooks/use-item-query";
import manageInvitationMutation from "@/hooks/mutations/invitations/manage";
import deleteInvitationMutation from "@/hooks/mutations/invitations/delete";
import sasInvitationMutation from "@/hooks/mutations/invitations/sas";

export default function Invitations({ identityId }: { identityId: string }) {
    const { isPending, data: invitations } = useItemsQuery({
        queryKey: ["invitations"],
        queryFn: () => listInvitations(identityId),
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

    const manageInvitation = manageInvitationMutation(identityId);
    const deleteInvitation = deleteInvitationMutation(identityId);
    const sasInvitation = sasInvitationMutation(identityId);

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
                                onSubmit={(sas) => sasInvitation.mutate({ invitationId: invitation.id, sas })}
                                onDelete={() => deleteInvitation.mutate(invitation.id)}
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
                                onAccept={() => manageInvitation.mutate({ invitationId: invitation.id, accepted: true })}
                                onDecline={() => manageInvitation.mutate({ invitationId: invitation.id, accepted: false })}
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
                                onDelete={() => deleteInvitation.mutate(invitation.id)}
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
