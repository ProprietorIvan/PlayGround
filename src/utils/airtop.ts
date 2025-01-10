// Import the Airtop SDK
import { AirtopClient, AirtopError } from "@airtop/sdk";
import type { AirtopSessionConfigV1 } from "@airtop/sdk/wrapper/AirtopSessions";

const AIRTOP_API_KEY =
    "9dedcecf29c076a2.zk76VSeQwES7VqsYWWDm7yVpLhkOXiP6lmhWCNkJ8a"; // Create an API from https://portal.airtop.ai/api-keys and paste the key here

export default async function run() {
    if (!AIRTOP_API_KEY) {
        throw new Error("AIRTOP_API_KEY is not set");
    }
    let client: AirtopClient | null = new AirtopClient({
        apiKey: AIRTOP_API_KEY,
    });
    // Create a session configuration
    const configuration: AirtopSessionConfigV1 = {
        timeoutMinutes: 10,

    };
    // Create a session
    let session: any = await client.sessions.create({ configuration });
    console.log("_______________________Creating a new session", session);

    if (!session || session.errors) {
        throw Error("Failed to create session");
    }
    let sessionId: string | null = session.data.id;;

    if (session.data.profileId) {
        console.log("Session profile ID:", session.data.profileId);
        console.log(
            "*** This profile ID cannot be used with another session until this session is terminated. ***"
        );
    }

    // Create a browser window
    if (!client || !sessionId) {
        throw Error("Client is not initialized");
    }


    return async (url: string|undefined, prompt: string) => {
        if(!url){
            return {
                data: {ranking:0}, terminate: () => {
                    if (client != null && sessionId != null) {
                        client.sessions.terminate(sessionId)
                    }
                }
            }
        }
        try {
            const window = await client.windows.create(session.data.id, { url });
            if (!window.data) {
                throw Error("Failed to create window");
            }

            // Add a wait of 5 secs to allow the page to load
            await new Promise((resolve) => setTimeout(resolve, 5000));

            // Get the window ID
            const { windowId } = window.data;

            // Prompt the page
            const promptResponse = await client.windows.pageQuery(
                sessionId,
                windowId,
                {
                    prompt,
                    followPaginationLinks: false,
                }
            );

            if (promptResponse.errors && promptResponse.errors.length > 0) {
                throw Error("Failed to prompt content");
            }
            console.log(promptResponse.data.modelResponse)
            return {
                data: JSON.parse(promptResponse.data.modelResponse), terminate: () => {
                    if (client != null && sessionId != null) {
                        client.sessions.terminate(sessionId)
                    }
                }
            }
            //check whether output format is always the same
        } catch (err) {
            if (client != null && sessionId != null) {
                await client.sessions.terminate(sessionId);
            }
            if (err instanceof AirtopError) {
                console.log(err.statusCode);
                console.log(err.message);
                console.log(err.body);
            } else {
                console.log(err);
            }
            return {data:{ranking: null},terminate: () => {}}
        } finally {
            //   Terminate the session
            //   if (client != null && sessionId != null) {
            //     await client.sessions.terminate(sessionId);
            //   }
        }
    };
}
