export interface OutlookEvent {
  id: string;
  createdDateTime: string;
  lastModifiedDateTime: string;
  changeKey: string;
  categories: string[];
  originalStartTimeZone: string;
  originalEndTimeZone: string;
  iCalUId: string;
  reminderMinutesBeforeStart: number;
  isReminderOn: boolean;
  hasAttachments: boolean;
  hideAttendees: boolean;
  subject: string;
  bodyPreview: string;
  importance: 'low' | 'normal' | 'high';
  sensitivity: 'normal' | 'personal' | 'private' | 'confidential';
  isAllDay: boolean;
  isCancelled: boolean;
  isDraft: boolean;
  isOrganizer: boolean;
  responseRequested: boolean;
  seriesMasterId: string | null;
  transactionId?: string;
  showAs: 'free' | 'tentative' | 'busy' | 'oof' | 'workingElsewhere' | 'unknown';
  type: 'singleInstance' | 'occurrence' | 'exception' | 'seriesMaster';
  webLink: string;
  onlineMeetingUrl: string | null;
  isOnlineMeeting: boolean;
  onlineMeetingProvider: 'unknown' | 'teamsForBusiness' | 'skypeForBusiness' | 'skypeForConsumer';
  onlineMeeting?: OnlineMeeting | null;
  recurrence: null;
  responseStatus: ResponseStatus;
  body: EventBody;
  start: EventDateTime;
  end: EventDateTime;
  location: EventLocation;
  locations: EventLocation[];
  attendees: EventAttendee[];
  organizer: EventOrganizer;
}

export interface EventDateTime {
  dateTime: string;
  timeZone: string;
}

export interface EventBody {
  contentType: 'text' | 'html';
  content: string;
}

export interface EventLocation {
  displayName: string;
  locationType: 'default' | string;
  uniqueId: string;
  uniqueIdType: 'private' | string;
}

export interface EmailAddress {
  name: string;
  address: string;
}

export interface ResponseStatus {
  response: 'none' | 'organizer' | 'tentativelyAccepted' | 'accepted' | 'declined' | 'notResponded';
  time: string;
}

export interface EventAttendee {
  type: 'required' | 'optional' | 'resource';
  status: ResponseStatus;
  emailAddress: EmailAddress;
}

export interface EventOrganizer {
  emailAddress: EmailAddress;
}

export interface OnlineMeeting {
  joinUrl: string;
  conferenceId: string;
  tollNumber: string;
}
