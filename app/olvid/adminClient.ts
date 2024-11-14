"use server";

import { OlvidAdminClient } from "@olvid/bot-node";

const olvidAdminClient = new OlvidAdminClient({
    serverUrl: "http://localhost:50051",
    clientKey: process.env.OLVID_ADMIN_CLIENT_KEY,
});

export default olvidAdminClient;
