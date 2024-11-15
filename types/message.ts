import { datatypes } from "@olvid/bot-node";

export type DataMessage = {
    id?: string;
    body: string;
    discussionId: string;
    sortIndex: number;
};

export const toDataMessage = (message: datatypes.Message): DataMessage => {
    return {
        id: message.id?.id.toString(),
        body: message.body,
        discussionId: message.discussionId.toString(),
        sortIndex: message.sortIndex,
    };
};
