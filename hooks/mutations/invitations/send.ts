import { useToast } from "@/hooks/use-toast";
import sendInvitation from "@/lib/invitations/send-invitation";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export default function sendInvitationMutation(identityId: string, setIsOpen: (isOpen: boolean) => void) {
    const client = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationFn: async (url: string) => {
            return await sendInvitation(identityId, url);
        },
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["invitations"] });
            setIsOpen(false);
        },
        onError: () => {
            setIsOpen(false);
            toast.toast({
                variant: "destructive",
                title: "Oops",
                description: "The invitation link is invalid",
            });
        },
    });
}
