"use server";

import toArray from "@/utils/async-iterator";
import Client from "../olvid/client";
import { DataInvitation, toDataInvitation } from "@/types/invitation";

export default async function listInvitations(identityId: string) {
    const client = await Client.get(identityId);
    const invitationList = await toArray(client.invitationList());
    const invitations = invitationList.reduce((acc, invitation) => {
        acc[invitation.id.toString()] = toDataInvitation(invitation);
        return acc;
    }, {} as { [key: string]: DataInvitation });

    return invitations;
}
