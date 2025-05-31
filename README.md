# Outlook Events Client

TypeScript library to manage Outlook calendar events using the Microsoft Graph API.

## Prerequisites

Before using this library, you must register an application in the [Azure Portal](https://portal.azure.com/) to authenticate with Microsoft Entra ID (formerly Azure AD) and grant the necessary permissions to access the Microsoft Graph API.

- **Register your app:** Follow the official Microsoft documentation to [register an application and configure permissions](https://learn.microsoft.com/en-us/graph/sdks/choose-authentication-providers?tabs=typescript#client-credentials-provider).
- **Required permissions:**
  - For calendar operations, your app typically needs `Calendars.ReadWrite` application permissions.
  - Grant admin consent for these permissions in the Azure Portal.
- **Obtain credentials:** After registration, you will need the `clientId`, `clientSecret`, and `tenantId` for your app.

**More resources:**

- [Register an application with the Microsoft identity platform](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
- [Microsoft Graph permissions reference](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Authentication providers for Microsoft Graph SDKs](https://learn.microsoft.com/en-us/graph/sdks/choose-authentication-providers?tabs=typescript)

## Features

- Create calendar events for Outlook users
- Cancel existing events
- Update existing events
- Robust parameter validation and error handling
- 100% tested with Vitest and mocks (no real API calls)

## Installation

```bash
npm install outlook-events-client
```

## Basic Usage

```typescript
import { OutlookEventsClient } from 'outlook-events-client';

const client = new OutlookEventsClient({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  tenantId: 'YOUR_TENANT_ID',
});

// Create an event
const event = {
  subject: 'Team Meeting',
  body: { contentType: 'HTML', content: '<p>Agenda...</p>' },
  start: { dateTime: '2025-06-01T10:00:00', timeZone: 'UTC' },
  end: { dateTime: '2025-06-01T11:00:00', timeZone: 'UTC' },
  location: { displayName: 'Room 1' },
  attendees: [
    { emailAddress: { address: 'user@example.com', name: 'User' }, type: 'required' }
  ]
};

await client.createEvent(event, 'user@domain.com');

// Cancel an event
await client.cancelEvent('eventId', 'user@domain.com', 'Cancellation reason');

// Update an event
await client.updateEvent('eventId', 'user@domain.com', { subject: 'New subject' });
```

## API

### `constructor(options: IClientCredential)`

Creates a client instance.

- `options`: `{ clientId: string; clientSecret: string; tenantId: string; }`

### `createEvent(event: IEvent, userPrincipalName: string): Promise<OutlookEvent>`

Creates a calendar event for the specified user.

- `event`: Object with event data (see example and types in `src/interfaces/outlook-event.ts`).
- `userPrincipalName`: User's email or UPN.
- **Errors:** Throws if parameters are invalid or the API fails.

### `cancelEvent(eventId: string, userPrincipalName: string, comment: string): Promise<void>`

Cancels an existing event.

- `eventId`: Event ID.
- `userPrincipalName`: User's email or UPN.
- `comment`: Cancellation reason.
- **Errors:** Throws if parameters are invalid or the API fails.

### `updateEvent(eventId: string, userPrincipalName: string, eventPatch: PatchEventType): Promise<void>`

Updates an existing event.

- `eventId`: Event ID.
- `userPrincipalName`: User's email or UPN.
- `eventPatch`: Object with fields to update.
- **Errors:** Throws if parameters are invalid or the API fails.

## Best Practices

- Always validate parameters before calling methods.
- Handle errors using try/catch.
- Use mocks in tests to avoid real API calls.
- Check type documentation in `src/interfaces/` to properly build event objects.

## Testing

The library includes unit tests with Vitest. To run them:

```bash
npm run test
```

## License

MIT
