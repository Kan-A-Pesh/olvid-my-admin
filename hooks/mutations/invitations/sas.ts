import { useToast } from "@/hooks/use-toast";
import sasInvitation from "@/lib/invitations/sas-invitation";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export default function sasInvitationMutation(identityId: string) {
    const client = useQueryClient();
    const toast = useToast();

    return useMutation({
        mutationFn: async ({ invitationId, sas }: { invitationId: string; sas: string }) => {
            return await sasInvitation(identityId, invitationId, sas);
        },
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["invitations"] });
            client.invalidateQueries({ queryKey: ["contacts"] });
            toast.toast({
                title: "Correct!",
                description: "The SAS code is correct",
            });
        },
    });
}
