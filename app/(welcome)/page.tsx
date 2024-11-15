"use server";

import listIdentities from "@/lib/identity/list-identities";
import IdentityCreator from "./creator";
import { redirect } from "next/navigation";

export default async function WelcomePage() {
    const identities = await listIdentities();

    if (Object.keys(identities).length > 0) {
        redirect(`/${Object.keys(identities)[0]}`);
    }

    return (
        <div className="flex-1 flex items-center justify-center flex-col gap-1 relative min-h-screen">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white/5 absolute">Olvid</h1>

            <h2 className="text-2xl ">Olvid bot interface</h2>
            <p className="max-w-64 text-justify mt-2 mb-4">
                Welcome to the Olvid bot interface, let's start by creating an identity for your bot.
            </p>
            <IdentityCreator />
        </div>
    );
}
