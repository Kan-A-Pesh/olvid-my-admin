"use server";

import Client from "../olvid/client";

export default async function sasInvitation(fromIdentityId: string, invitationId: string, sas: string) {
    const client = await Client.get(fromIdentityId);
    await client.invitationSas({
        invitationId: BigInt(invitationId),
        sas: sas,
    });
}
