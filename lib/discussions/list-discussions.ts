"use server";

import toArray from "@/utils/async-iterator";
import Client from "../olvid/client";
import { DataDiscussion, toDataDiscussion } from "@/types/discussion";

export default async function listDiscussions(identityId: string) {
    const client = await Client.get(identityId);
    const discussionList = await toArray(client.discussionList());
    const discussions = discussionList.reduce((acc, discussion) => {
        acc[discussion.id.toString()] = toDataDiscussion(discussion);
        return acc;
    }, {} as { [key: string]: DataDiscussion });

    return discussions;
}
