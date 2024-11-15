"use server";

import { toDataInvitation } from "@/types/invitation";
import Client from "../olvid/client";

export default async function sendInvitation(fromIdentityId: string, url: string) {
    const client = await Client.get(fromIdentityId);
    const invitation = await client.invitationNew({
        invitationUrl: url,
    });

    return toDataInvitation(invitation);
}
