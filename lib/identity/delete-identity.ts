"use server";

import olvidAdminClient from "../olvid/adminClient";

export default async function deleteIdentity(id: string) {
    await olvidAdminClient.adminIdentityDelete({
        identityId: BigInt(id),
    });
}
