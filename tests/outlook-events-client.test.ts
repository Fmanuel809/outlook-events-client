/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mocks globales
const post = vi.fn();
const patch = vi.fn();
const mockApi = vi.fn(() => ({ post, patch }));
const mockClient = { api: mockApi };

// Mock de createGraphClient ANTES de importar la clase
vi.mock("../src/utils", () => ({
  createGraphClient: vi.fn(() => mockClient),
}));

import { OutlookEventsClient } from "../src/outlook-events-client";

describe("OutlookEventsClient", () => {
  const credentials = {
    clientId: "id",
    clientSecret: "secret",
    tenantId: "tenant",
  };
  let client: OutlookEventsClient;

  beforeEach(() => {
    client = new OutlookEventsClient(credentials);
    mockApi.mockClear();
    post.mockClear();
    patch.mockClear();
  });

  it("should throw if event is invalid in createEvent", async () => {
    // @ts-expect-error purposely invalid
    await expect(client.createEvent(undefined, "user")).rejects.toThrow();
  });

  it("should throw if userPrincipalName is invalid in createEvent", async () => {
    // @ts-expect-error purposely invalid
    await expect(client.createEvent({}, "")).rejects.toThrow();
  });

  it("should call api and post in createEvent", async () => {
    post.mockResolvedValue({});
    await client.createEvent({} as any, "user");
    expect(mockApi).toHaveBeenCalledWith("/users/user/calendar/events");
    expect(post).toHaveBeenCalled();
  });

  it("should throw if eventId is invalid in cancelEvent", async () => {
    // @ts-expect-error purposely invalid
    await expect(client.cancelEvent(undefined, "user", "c")).rejects.toThrow();
  });

  it("should throw if userPrincipalName is invalid in cancelEvent", async () => {
    await expect(client.cancelEvent("id", "", "c")).rejects.toThrow();
  });

  it("should call api and post in cancelEvent", async () => {
    post.mockResolvedValue(undefined);
    await client.cancelEvent("id", "user", "comment");
    expect(mockApi).toHaveBeenCalledWith(
      "/users/user/calendar/events/id/cancel"
    );
    expect(post).toHaveBeenCalledWith({ Comment: "comment" });
  });

  it("should throw if eventPatch is invalid in updateEvent", async () => {
    // @ts-expect-error purposely invalid
    await expect(client.updateEvent("id", "user", undefined)).rejects.toThrow();
  });

  it("should throw if eventId is invalid in updateEvent", async () => {
    await expect(client.updateEvent("", "user", {})).rejects.toThrow();
  });

  it("should throw if userPrincipalName is invalid in updateEvent", async () => {
    await expect(client.updateEvent("id", "", {})).rejects.toThrow();
  });

  it("should call api and patch in updateEvent", async () => {
    patch.mockResolvedValue(undefined);
    await client.updateEvent("id", "user", { foo: "bar" } as any);
    expect(mockApi).toHaveBeenCalledWith("/users/user/calendar/events/id");
    expect(patch).toHaveBeenCalledWith({ foo: "bar" });
  });

  it("should throw and log if post fails in createEvent", async () => {
    const error = new Error("fail");
    post.mockRejectedValue(error);
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(client.createEvent({} as any, "user")).rejects.toThrow(
      "Failed to create event"
    );
    expect(spy).toHaveBeenCalledWith("Error creating event:", error.message);
    spy.mockRestore();
  });

  it("should throw and log if post fails in cancelEvent", async () => {
    const error = new Error("fail");
    post.mockRejectedValue(error);
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(client.cancelEvent("id", "user", "comment")).rejects.toThrow(
      "Failed to cancel event"
    );
    expect(spy).toHaveBeenCalledWith("Error canceling event:", error.message);
    spy.mockRestore();
  });

  it("should throw and log if patch fails in updateEvent", async () => {
    const error = new Error("fail");
    patch.mockRejectedValue(error);
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(
      client.updateEvent("id", "user", { foo: "bar" } as any)
    ).rejects.toThrow("Failed to update event");
    expect(spy).toHaveBeenCalledWith("Error updating event:", error.message);
    spy.mockRestore();
  });

  it("should log and throw if post fails with non-Error in createEvent", async () => {
    post.mockRejectedValue("fail-string");
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(client.createEvent({} as any, "user")).rejects.toThrow(
      "Failed to create event"
    );
    expect(spy).toHaveBeenCalledWith("Error creating event:", "fail-string");
    spy.mockRestore();
  });

  it("should log and throw if post fails with non-Error in cancelEvent", async () => {
    post.mockRejectedValue({ custom: "fail" });
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(client.cancelEvent("id", "user", "comment")).rejects.toThrow(
      "Failed to cancel event"
    );
    expect(spy).toHaveBeenCalledWith("Error canceling event:", {
      custom: "fail",
    });
    spy.mockRestore();
  });

  it("should log and throw if patch fails with non-Error in updateEvent", async () => {
    patch.mockRejectedValue("fail-non-error");
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(
      client.updateEvent("id", "user", { foo: "bar" } as any)
    ).rejects.toThrow("Failed to update event");
    expect(spy).toHaveBeenCalledWith("Error updating event:", "fail-non-error");
    spy.mockRestore();
  });
});
