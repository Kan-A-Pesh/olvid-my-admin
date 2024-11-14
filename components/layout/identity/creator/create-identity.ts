"use server";

import olvidAdminClient from "@/app/olvid/adminClient";
import { FormIdentityDetails } from "@/types/form/identity";
import { datatypes } from "@olvid/bot-node";

/**
 * Creates a new Olvid identity.
 *
 * @param data - Identity details.
 *
 * @returns The ID of the newly created identity as a string.
 */
export default async function createIdentity(data: FormIdentityDetails) {
    const identity = await olvidAdminClient.adminIdentityNew({
        identityDetails: new datatypes.IdentityDetails(data),
    });

    return identity.id.toString();
}
