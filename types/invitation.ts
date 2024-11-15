import { datatypes } from "@olvid/bot-node";

export type DataInvitation = {
    id: string;
    displayName: string;
    sas: string;
    status: InvitationStatus;
    timestamp: number;
};

export const toDataInvitation = (invitation: datatypes.Invitation): DataInvitation => {
    let status = InvitationStatus.UNKNOWN;
    switch (invitation.status) {
        case datatypes.Invitation_Status.GROUP_INVITATION_WAIT_YOU_TO_ACCEPT:
        case datatypes.Invitation_Status.INTRODUCTION_WAIT_YOU_TO_ACCEPT:
        case datatypes.Invitation_Status.INVITATION_WAIT_YOU_TO_ACCEPT:
        case datatypes.Invitation_Status.ONE_TO_ONE_INVITATION_WAIT_YOU_TO_ACCEPT:
            status = InvitationStatus.RECEIVED;
            break;

        case datatypes.Invitation_Status.INTRODUCTION_WAIT_IT_TO_ACCEPT:
        case datatypes.Invitation_Status.INVITATION_WAIT_IT_TO_ACCEPT:
        case datatypes.Invitation_Status.ONE_TO_ONE_INVITATION_WAIT_IT_TO_ACCEPT:
            status = InvitationStatus.SENT;
            break;

        case datatypes.Invitation_Status.INVITATION_WAIT_IT_FOR_SAS_EXCHANGE:
        case datatypes.Invitation_Status.INVITATION_WAIT_YOU_FOR_SAS_EXCHANGE:
            status = InvitationStatus.ONGOING;
            break;

        case datatypes.Invitation_Status.GROUP_INVITATION_FROZEN:
        case datatypes.Invitation_Status.INVITATION_STATUS_IN_PROGRESS:
        case datatypes.Invitation_Status.UNSPECIFIED:
            status = InvitationStatus.UNKNOWN;
            break;
    }
    return {
        id: invitation.id.toString(),
        displayName: invitation.displayName,
        sas: invitation.sas,
        status: status,
        timestamp: Number(invitation.timestamp),
    };
};

export enum InvitationStatus {
    UNKNOWN = "unknown",
    RECEIVED = "received",
    SENT = "sent",
    ONGOING = "ongoing",
}
