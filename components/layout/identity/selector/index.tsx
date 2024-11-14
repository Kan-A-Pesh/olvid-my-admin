import olvidAdminClient from "@/app/olvid/adminClient";
import toArray from "@/utils/async-iterator";
import ClientIdentitySelector from "./selector";

export default async function IdentitySelector() {
    const identities = await toArray(olvidAdminClient.adminIdentityList());
    return <ClientIdentitySelector identities={identities} />;
}
