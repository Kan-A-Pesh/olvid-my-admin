import manageInvitation from "@/lib/invitations/manage-invitation";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export default function manageInvitationMutation(identityId: string) {
    const client = useQueryClient();

    return useMutation({
        mutationFn: async ({ invitationId, accepted }: { invitationId: string; accepted: boolean }) => {
            return await manageInvitation(identityId, invitationId, accepted);
        },
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["invitations"] });
            client.invalidateQueries({ queryKey: ["contacts"] });
        },
    });
}
