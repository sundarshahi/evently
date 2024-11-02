import { Event } from "@repo/db/client";

import { eventQueue } from "@/config/queue";
import { parseRecurringDates } from "@/src/utils/parse-dates";

export const scheduleRecurringEvent = async (
  event: Event,
  recurrenceRule: string,
  recurrenceEnd: Date
) => {
  const recurrenceDates = parseRecurringDates({
    rruleString: recurrenceRule,
    startDate: event.start_time,
    recurrenceEnd: recurrenceEnd,
  });

  await eventQueue
    .add("create-event-instance", {
      parentEventId: event.id,
      recurrenceDates,
      startTime: event.start_time,
      endTime: event.end_time,
      createdBy: event.created_by,
    })
    .then((job) => console.log(job.id, "added to queue"));
};
