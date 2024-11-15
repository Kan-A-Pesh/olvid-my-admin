import deleteIdentity from "@/lib/identity/delete-identity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function deleteIdentityMutation(identity: string) {
    const router = useRouter();
    const client = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await deleteIdentity(identity);
        },
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["identities"] });
            router.push("/");
        },
    });
}
