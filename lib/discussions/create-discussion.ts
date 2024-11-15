"use server";

import { toDataDiscussion } from "@/types/discussion";
import Client from "../olvid/client";

export default async function createDiscussion(identityId: string, contactId: string) {
    const client = await Client.get(identityId);
    const discussion = await client.discussionGetByContact({
        contactId: BigInt(contactId),
    });

    return toDataDiscussion(discussion);
}
