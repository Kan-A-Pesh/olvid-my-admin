"use server";

import InvitationsAddCard from "./add-card";
import Invitations from "./invitations";

export default async function InvitationPage({ params }: { params: { identityId: string } }) {
    return (
        <section className="p-4 flex flex-col overflow-y-auto gap-8">
            <InvitationsAddCard identityId={params.identityId} />
            <Invitations identityId={params.identityId} />
        </section>
    );
}
