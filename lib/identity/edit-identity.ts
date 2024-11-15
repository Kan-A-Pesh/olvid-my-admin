"use server";

import Client from "@/lib/olvid/client";
import { FormIdentityDetails } from "@/types/identity";
import { datatypes } from "@olvid/bot-node";

export default async function editIdentity(id: string, data: FormIdentityDetails) {
    const client = await Client.get(id);
    await client.identityUpdateDetails({
        newDetails: new datatypes.IdentityDetails(data),
    });
}
