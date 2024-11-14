"use server";

import olvidAdminClient from "@/app/olvid/adminClient";
import toArray from "@/utils/async-iterator";
import ClientIdentitySelector from "./selector";
import { DataIdentity, toDataIdentity } from "@/types/form/identity";

export default async function IdentitySelector() {
    const identityList = await toArray(olvidAdminClient.adminIdentityList());
    const identities = identityList.reduce((acc, identity) => {
        acc[identity.id.toString()] = toDataIdentity(identity);
        return acc;
    }, {} as { [key: string]: DataIdentity });

    return <ClientIdentitySelector identities={identities} />;
}
