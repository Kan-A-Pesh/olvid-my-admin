"use server";

import InvitationsAddCard from "./add-card";
import Invitations from "./invitations";

export default async function InvitationPage() {
    return (
        <section className="p-4 flex flex-col overflow-y-auto gap-8">
            <InvitationsAddCard />
            <Invitations />
        </section>
    );
}
