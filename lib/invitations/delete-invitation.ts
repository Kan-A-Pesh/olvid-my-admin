"use server";

import Client from "../olvid/client";

export default async function deleteInvitation(fromIdentityId: string, invitationId: string) {
    const client = await Client.get(fromIdentityId);
    await client.invitationDelete({
        invitationId: BigInt(invitationId),
    });
}
