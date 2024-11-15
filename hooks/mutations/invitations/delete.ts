import deleteInvitation from "@/lib/invitations/delete-invitation";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export default function deleteInvitationMutation(identityId: string) {
    const client = useQueryClient();

    return useMutation({
        mutationFn: async (invitationId: string) => {
            return await deleteInvitation(identityId, invitationId);
        },
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["invitations"] });
        },
    });
}
