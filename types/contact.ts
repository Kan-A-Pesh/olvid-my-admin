import { datatypes } from "@olvid/bot-node";

export type DataContact = {
    id: string;
    displayName: string;
};

export const toDataContact = (contact: datatypes.Contact): DataContact => {
    return {
        id: contact.id.toString(),
        displayName: contact.displayName,
    };
};
