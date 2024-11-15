import createDiscussion from "@/lib/discussions/create-discussion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function createDiscussionMutation(identityId: string) {
    const router = useRouter();
    const client = useQueryClient();

    return useMutation({
        mutationFn: async (contactId: string) => {
            return await createDiscussion(identityId, contactId);
        },
        onSuccess: (discussion) => {
            client.invalidateQueries({ queryKey: ["discussions"] });
            router.push(`/${identityId}/discussions/${discussion.id}`);
        },
    });
}
