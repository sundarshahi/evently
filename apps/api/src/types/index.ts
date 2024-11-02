export interface EventInput {
  title: string;
  description?: string | null;
  start_time: Date;
  end_time: Date;
  time_zone: string;
  location?: string | null;
  created_by: string;
  recurrence_rule?: string;
  recurrence_end?: Date;
}

export interface Event extends EventInput {
  id: string;
  created_at: Date;
  updated_at: Date;
}

export interface EventInstanceInput extends EventInput {
  parent_event_id: string;
}

export interface ParticipantInput {
  name: string;
  email: string;
  rsvp_status: RSVPStatus;
  event_id: string;
}

export enum RSVPStatus {
  accepted = "accepted",
  declined = "declined",
  pending = "pending",
}
