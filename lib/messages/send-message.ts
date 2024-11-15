"use server";

import { toDataMessage } from "@/types/message";
import Client from "../olvid/client";

export default async function sendMessage(identityId: string, discussionId: string, body: string) {
    const client = await Client.get(identityId);
    const message = await client.messageSend({
        discussionId: BigInt(discussionId),
        body: body,
    });

    return toDataMessage(message);
}
