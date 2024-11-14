import { z } from "zod";

export const formIdentityDetails = z.object({
    firstName: z.string().min(1).max(30),
    lastName: z.string().min(1).max(30).optional(),
    company: z.string().min(1).max(40).optional(),
    position: z.string().min(1).max(40).optional(),
});

export type FormIdentityDetails = z.infer<typeof formIdentityDetails>;
