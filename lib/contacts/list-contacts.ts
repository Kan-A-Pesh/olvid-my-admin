"use server";

import toArray from "@/utils/async-iterator";
import Client from "../olvid/client";
import { DataContact, toDataContact } from "@/types/contact";

export default async function listContacts(identityId: string) {
    const client = await Client.get(identityId);
    const contactList = await toArray(client.contactList());
    const contacts = contactList.reduce((acc, contact) => {
        acc[contact.id.toString()] = toDataContact(contact);
        return acc;
    }, {} as { [key: string]: DataContact });

    return contacts;
}
