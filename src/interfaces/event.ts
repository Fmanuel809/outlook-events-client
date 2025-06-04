/**
 * Represents an Outlook calendar event.
 *
 * @example
 * const event: IOutlookEvent = {
 *   subject: 'Team Meeting',
 *   body: {
 *     contentType: 'HTML',
 *     content: '<p>Discuss project updates</p>'
 *   },
 *   start: {
 *     dateTime: '2025-05-30T10:00:00',
 *     timeZone: 'Pacific Standard Time'
 *   },
 *   end: {
 *     dateTime: '2025-05-30T11:00:00',
 *     timeZone: 'Pacific Standard Time'
 *   },
 *   location: {
 *     displayName: 'Conference Room 1'
 *   },
 *   attendees: [
 *     {
 *       emailAddress: {
 *         address: 'john.doe@example.com',
 *         name: 'John Doe'
 *       },
 *       type: 'required'
 *     }
 *   ],
 *   isOnlineMeeting: true,
 *   onlineMeetingProvider: 'teamsForBusiness',
 *   transactionId: 'abc123'
 * };
 */
export interface IEvent {
  /**
   * The subject or title of the event.
   * @example 'Team Meeting'
   */
  subject: string;
  /**
   * The body content of the event.
   */
  body: {
    /**
     * The type of content in the body (HTML or plain text).
     * @example 'HTML'
     */
    contentType: 'text' | 'html';
    /**
     * The actual content of the event body.
     * @example '<p>Discuss project updates</p>'
     */
    content: string;
  };
  /**
   * The start date and time of the event.
   */
  start: {
    /**
     * The start date and time in ISO 8601 format.
     * @example '2025-05-30T10:00:00'
     */
    dateTime: string;
    /**
     * The time zone for the start time.
     * @example 'Pacific Standard Time'
     */
    timeZone: string;
  };
  /**
   * The end date and time of the event.
   */
  end: {
    /**
     * The end date and time in ISO 8601 format.
     * @example '2025-05-30T11:00:00'
     */
    dateTime: string;
    /**
     * The time zone for the end time.
     * @example 'Pacific Standard Time'
     */
    timeZone: string;
  };
  /**
   * The location where the event takes place.
   */
  location: {
    /**
     * The display name of the location.
     * @example 'Conference Room 1'
     */
    displayName: string;
  };
  /**
   * The list of attendees for the event.
   */
  attendees: {
    /**
     * The email address and name of the attendee.
     */
    emailAddress: {
      /**
       * The email address of the attendee.
       * @example 'john.doe@example.com'
       */
      address: string;
      /**
       * The name of the attendee.
       * @example 'John Doe'
       */
      name: string;
    };
    /**
     * The type of attendee (required, optional, or resource).
     * @example 'required'
     */
    type: 'required' | 'optional' | 'resource';
  }[];
  /**
   * Indicates if the event is an online meeting.
   * @example true
   */
  isOnlineMeeting?: boolean;
  /**
   * The provider for the online meeting (e.g., Teams, Skype).
   * @example 'teamsForBusiness'
   */
  onlineMeetingProvider?: 'teamsForBusiness' | 'skypeForBusiness' | 'unknown' | string;
  /**
   * A unique transaction ID for the event (optional).
   * @example 'abc123'
   */
  transactionId?: string;

  /**
   * Categories associated with the event.
  * @example ['Project Updates', 'Team Meetings']
   */
  categories?: string[];

  /**
   * The importance of the event (low, normal, high).
   * @example 'normal'
   */
  importance?: 'low' | 'normal' | 'high';

  /**
   * Indicates if the event is an all-day event.
   * @example false
   */
  isAllDay?: boolean;
}

export type PatchEventType = Partial<IEvent>;