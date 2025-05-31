import { Client } from "@microsoft/microsoft-graph-client";
import {
  IClientCredential,
  IEvent,
  OutlookEvent,
  PatchEventType,
} from "./interfaces";
import { createGraphClient } from "./utils";

/**
 * Client for managing Outlook calendar events using Microsoft Graph API.
 */
export class OutlookEventsClient {
  private readonly client: Client;

  /**
   * Creates a new OutlookEventsClient instance.
   * @param options Client credentials for authentication.
   */
  constructor(options: IClientCredential) {
    this.client = createGraphClient(options);
  }

  /**
   * Creates a new calendar event for a user.
   * @param event The event data to create.
   * @param userPrincipalName The user's principal name (email or UPN).
   * @returns The created Outlook event.
   * @throws Error if the event cannot be created.
   */
  async createEvent(
    event: IEvent,
    userPrincipalName: string
  ): Promise<OutlookEvent> {
    if (!event || typeof event !== "object" || Array.isArray(event)) {
      throw new Error("A valid event object is required");
    }
    if (
      !userPrincipalName ||
      typeof userPrincipalName !== "string" ||
      userPrincipalName.trim() === ""
    ) {
      throw new Error("A valid userPrincipalName is required");
    }
    try {
      const response = await this.client
        .api(`/users/${userPrincipalName}/calendar/events`)
        .post(event);
      return response as OutlookEvent;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating event:", error.message);
      } else {
        console.error("Error creating event:", error);
      }
      throw new Error("Failed to create event");
    }
  }

  /**
   * Cancels an existing calendar event for a user.
   * @param eventId The ID of the event to cancel.
   * @param userPrincipalName The user's principal name (email or UPN).
   * @param comment The cancellation comment.
   * @throws Error if the event cannot be canceled.
   */
  async cancelEvent(
    eventId: string,
    userPrincipalName: string,
    comment: string
  ): Promise<void> {
    if (!eventId || typeof eventId !== "string" || eventId.trim() === "") {
      throw new Error("A valid eventId is required");
    }
    if (
      !userPrincipalName ||
      typeof userPrincipalName !== "string" ||
      userPrincipalName.trim() === ""
    ) {
      throw new Error("A valid userPrincipalName is required");
    }
    try {
      await this.client
        .api(`/users/${userPrincipalName}/calendar/events/${eventId}/cancel`)
        .post({ Comment: comment });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error canceling event:", error.message);
      } else {
        console.error("Error canceling event:", error);
      }
      throw new Error("Failed to cancel event");
    }
  }

  /**
   * Updates an existing calendar event for a user.
   * @param eventId The ID of the event to update.
   * @param userPrincipalName The user's principal name (email or UPN).
   * @param eventPatch The patch object with updated event fields.
   * @throws Error if the event cannot be updated.
   */
  async updateEvent(
    eventId: string,
    userPrincipalName: string,
    eventPatch: PatchEventType
  ): Promise<void> {
    if (!eventPatch || typeof eventPatch !== "object" || Array.isArray(eventPatch)) {
      throw new Error("A valid eventPatch object is required");
    }
    if (!eventId || typeof eventId !== "string" || eventId.trim() === "") {
      throw new Error("A valid eventId is required");
    }
    if (
      !userPrincipalName ||
      typeof userPrincipalName !== "string" ||
      userPrincipalName.trim() === ""
    ) {
      throw new Error("A valid userPrincipalName is required");
    }
    try {
      await this.client
        .api(`/users/${userPrincipalName}/calendar/events/${eventId}`)
        .patch(eventPatch);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating event:", error.message);
      } else {
        console.error("Error updating event:", error);
      }
      throw new Error("Failed to update event");
    }
  }
}
