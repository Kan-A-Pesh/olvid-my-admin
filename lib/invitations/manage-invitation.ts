"use server";

import Client from "../olvid/client";

export default async function manageInvitation(fromIdentityId: string, invitationId: string, accepted: boolean) {
    const client = await Client.get(fromIdentityId);
    if (accepted) {
        await client.invitationAccept({
            invitationId: BigInt(invitationId),
        });
    } else {
        await client.invitationDecline({
            invitationId: BigInt(invitationId),
        });
    }
}
