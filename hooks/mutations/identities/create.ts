import createIdentity from "@/lib/identity/create-identity";
import { FormIdentityDetails } from "@/types/identity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function createIdentityMutation() {
    const router = useRouter();
    const client = useQueryClient();

    return useMutation({
        mutationFn: async (data: FormIdentityDetails) => {
            return await createIdentity(data);
        },

        onSuccess: (id) => {
            client.invalidateQueries({ queryKey: ["identities"] });
            router.push(`/${id}`);
        },
    });
}
