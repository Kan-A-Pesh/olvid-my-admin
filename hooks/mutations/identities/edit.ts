import editIdentity from "@/lib/identity/edit-identity";
import { FormIdentityDetails } from "@/types/identity";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function editIdentityMutation(identity: string, setIsEditModalOpen: (open: boolean) => void) {
    const client = useQueryClient();

    return useMutation({
        mutationFn: async (data: FormIdentityDetails) => {
            await editIdentity(identity, data);
        },
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["identities"] });
            setIsEditModalOpen(false);
        },
    });
}
