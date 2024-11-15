"use server";

import Client from "@/lib/olvid/client";
import { toDataIdentity } from "@/types/identity";

export default async function getIdentity(identityId: string) {
    const client = await Client.get(identityId);
    const identity = toDataIdentity(await client.identityGet({}));

    return identity;
}
