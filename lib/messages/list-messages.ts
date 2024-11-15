"use server";

import toArray from "@/utils/async-iterator";
import Client from "../olvid/client";
import { toDataMessage } from "@/types/message";
import { datatypes } from "@olvid/bot-node";

export default async function listMessages(identityId: string, discussionId: string) {
    const client = await Client.get(identityId);
    const messageList = await toArray(
        client.messageList({
            filter: new datatypes.MessageFilter({
                discussionId: BigInt(discussionId),
            }),
        }),
    );

    const messages = messageList
        .map((message) => toDataMessage(message))
        .sort((a, b) => {
            return a.sortIndex - b.sortIndex;
        });

    return messages;
}
