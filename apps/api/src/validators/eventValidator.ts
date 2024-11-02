import { z } from "zod";

const validTimezones = [
  "Europe/London",
  "Asia/Kathmandu",
  "America/New_York",
] as const;

const rruleRegex =
  /^(FREQ=(HOURLY|DAILY|WEEKLY|MONTHLY|YEARLY)(;INTERVAL=\d+)?(;UNTIL=\d{8}T\d{6}Z)?(;COUNT=\d+)?(;BYDAY=(MO|TU|WE|TH|FR|SA|SU)(,\s?(MO|TU|WE|TH|FR|SA|SU))*)?;?)+$/;

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
    recurrence_rule: z
      .string()
      .optional()
      .refine(
        (value) => {
          return !value || rruleRegex.test(value);
        },
        {
          message:
            "Invalid. Use in following format (e.g., FREQ=WEEKLY;INTERVAL=7;COUNT=1;UNTIL=20241002T181500Z;BYDAY=SU,MO,TU).",
        }
      ),
    recurrence_end: utcDateString.optional(),
    created_by: z.string().optional(),
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
