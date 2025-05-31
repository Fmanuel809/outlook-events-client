import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import { ClientSecretCredential } from "@azure/identity";
import { IClientCredential } from "../interfaces";
import { Client } from '@microsoft/microsoft-graph-client';

/**
 * Creates a Microsoft Graph client using the provided credentials.
 * @param {IClientCredential} credentials - The client credentials containing clientId, clientSecret, and tenantId.
 * @returns {Client} - An instance of the Microsoft Graph client.
 * @throws {Error} - Throws an error if the credentials are not provided or are invalid.
 * @example
 * const graphClient = createGraphClient({
 *   clientId: 'your-client-id',
 *   clientSecret: 'your-client-secret',
 *   tenantId: 'your-tenant-id'
 * });
 */
export const createGraphClient = (credentials: IClientCredential): Client => {
    const { clientId, clientSecret, tenantId } = credentials;
    const credentialProvider = new ClientSecretCredential(tenantId || "", clientId, clientSecret);

    const authPRovider = new TokenCredentialAuthenticationProvider(credentialProvider, {
        scopes: ["https://graph.microsoft.com/.default"]
    });

    return Client.initWithMiddleware({ authProvider: authPRovider });
}