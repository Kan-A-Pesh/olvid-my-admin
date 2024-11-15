import { datatypes } from "@olvid/bot-node";
import { z } from "zod";

export const formIdentityDetails = z.object({
    firstName: z.string().min(1).max(30).default(""),
    lastName: z.string().max(30).optional(),
    company: z.string().max(40).optional(),
    position: z.string().max(40).optional(),
});

export type FormIdentityDetails = z.infer<typeof formIdentityDetails>;

export type DataIdentity = {
    id: string;
    displayName: string;
    firstName?: string;
    lastName?: string;
    company?: string;
    position?: string;
};

export const toDataIdentity = (identity: datatypes.Identity): DataIdentity => {
    return {
        id: identity.id.toString(),
        displayName: identity.displayName,
        firstName: identity.details?.firstName,
        lastName: identity.details?.lastName,
        company: identity.details?.company,
        position: identity.details?.position,
    };
};
