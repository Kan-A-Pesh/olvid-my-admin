"use server";

import Client from "../olvid/client";

export default async function getInvitationLink(identityId: string) {
    const client = await Client.get(identityId);
    const identity = await client.identityGet({});
    return identity.invitationUrl;
}
