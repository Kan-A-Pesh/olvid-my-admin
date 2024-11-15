"use server";

import olvidAdminClient from "@/lib/olvid/adminClient";
import { DataIdentity, toDataIdentity } from "@/types/identity";
import toArray from "@/utils/async-iterator";

export default async function listIdentities() {
    const identityList = await toArray(olvidAdminClient.adminIdentityList());
    const identities = identityList.reduce((acc, identity) => {
        acc[identity.id.toString()] = toDataIdentity(identity);
        return acc;
    }, {} as { [key: string]: DataIdentity });

    return identities;
}
