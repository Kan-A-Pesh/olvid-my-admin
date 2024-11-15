"use server";

import olvidAdminClient from "@/lib/olvid/adminClient";
import { FormIdentityDetails } from "@/types/identity";
import { datatypes } from "@olvid/bot-node";

export default async function createIdentity(data: FormIdentityDetails) {
    const identity = await olvidAdminClient.adminIdentityNew({
        identityDetails: new datatypes.IdentityDetails(data),
    });

    return identity.id.toString();
}
