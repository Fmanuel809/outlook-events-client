/**
 * Interface representing the credentials for a client application.
 * This interface is used to define the structure of client credentials
 * that are typically used for authentication in OAuth2 or similar protocols.
 * 
 * @interface IClientCredential
 * @property {string} clientId - The client ID of the application.
 * @property {string} clientSecret - The client secret of the application.
 * @property {string} [tenantId] - The tenant ID of the application (optional).
 */
export interface IClientCredential {
    /**
     * The client ID of the application.
     */
    clientId: string;
    
    /**
     * The client secret of the application.
     */
    clientSecret: string;
    
    /**
     * The tenant ID of the application.
     */
    tenantId?: string;
}