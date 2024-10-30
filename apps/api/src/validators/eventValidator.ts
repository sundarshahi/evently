import { z } from "zod";

const validTimezones = [
  "Europe/London",
  "Asia/Kathmandu",
  "America/New_York",
] as const;

const utcDateString = z.string().refine(
  (date) => {
    return (
      /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/.test(date) &&
      !isNaN(Date.parse(date))
    );
  },
  {
    message:
      'Invalid UTC date string. Must be in ISO 8601 format with "Z" suffix, e.g., "2023-12-12T10:00:00Z".',
  }
);

export const eventSchema = z
  .object({
    title: z
      .string()
      .min(5, { message: "Title must be at least 5 characters long." })
      .max(150, { message: "Title must be at most 150 characters long." }),
    description: z.string().max(500).optional(),
    start_time: utcDateString,
    end_time: utcDateString,
    time_zone: z.enum(validTimezones, {
      message: "Must be a valid timezone string.",
    }),
    location: z.string().optional(),
  })
  .superRefine((field, ctx) => {
    const startTime = new Date(field.start_time);
    const endTime = new Date(field.end_time);
    if (endTime <= startTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End time must be after the start time.",
      });
    }
    return true;
  });
