import "server-only";

import { datatypes, OlvidClient } from "@olvid/bot-node";
import olvidAdminClient from "./adminClient";

// export default async function getOlvidClient(identityId: bigint) {
//     const identity = await olvidAdminClient.messageSend({
//         filter?: {

//         }
//     })

//     new OlvidClient({
//         serverUrl: "http://localhost:50051",
//         clientKey: clientKey,
//     });
// }

export default class Client {
    public static keys: { [key: string]: string } = {};
    public static clients: { [key: string]: OlvidClient } = {};

    public static async get(identityId: string) {
        if (!Client.keys[identityId]) {
            await Client.searchOrCreateKey(identityId);
        }

        if (!Client.clients[identityId]) {
            Client.clients[identityId] = new OlvidClient({
                serverUrl: "http://localhost:50051",
                clientKey: Client.keys[identityId],
            });
        }

        return Client.clients[identityId];
    }

    private static async searchOrCreateKey(identityId: string) {
        const keyList = olvidAdminClient.adminClientKeyList({
            filter: new datatypes.ClientKeyFilter({
                identity: {
                    value: BigInt(identityId),
                    case: "identityId",
                },
            }),
        });

        for await (const key of keyList) {
            if (key.identityId.toString() === identityId) {
                Client.keys[identityId] = key.key;
                return;
            }
        }

        const key = await olvidAdminClient.adminClientKeyNew({
            name: `keygen-${identityId}-${Date.now()}`,
            identityId: BigInt(identityId),
        });

        Client.keys[identityId] = key.key;
    }
}
