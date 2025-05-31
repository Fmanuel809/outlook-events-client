import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { createGraphClient } from '../../src/utils';
import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';

type FakeToken = { token: string; expiresOnTimestamp: number };

describe('createGraphClient', () => {
  const mockClientId = 'test-client-id';
  const mockClientSecret = 'test-client-secret';
  const mockTenantId = 'test-tenant-id';

  beforeAll(() => {
    vi.spyOn(ClientSecretCredential.prototype, 'getToken').mockResolvedValue({
      token: 'fake-token',
      expiresOnTimestamp: Date.now() + 3600 * 1000
    } as FakeToken);
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should create a Microsoft Graph Client instance', () => {
    const client = createGraphClient({
      clientId: mockClientId,
      clientSecret: mockClientSecret,
      tenantId: mockTenantId
    });
    expect(client).toBeInstanceOf(Client);
  });

  it('should throw an error if credentials are missing', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => createGraphClient({} as any)).toThrow();
  });
});
