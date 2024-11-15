import { datatypes } from "@olvid/bot-node";

export type DataDiscussion = {
    id: string;
    title: string;
};

export const toDataDiscussion = (discussion: datatypes.Discussion): DataDiscussion => {
    return {
        id: discussion.id.toString(),
        title: discussion.title,
    };
};
