import z from "zod";
import { RSVPStatus } from "../types";

export const participantSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),

  rsvp_status: z.nativeEnum(RSVPStatus, {
    errorMap: () => ({
      message: "RSVP status must be 'accepted', 'declined', or 'pending'.",
    }),
  }),
});

export const eventIdSchema = z.object({
  eventId: z.string().uuid({ message: "Invalid eventId." }),
});
