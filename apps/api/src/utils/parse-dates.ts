import { RRule } from "rrule";
import { dayjs } from "./dayjs";

export const parseRecurringDates = ({
  rruleString,
  startDate,
  recurrenceEnd,
}: {
  rruleString: string;
  startDate: Date;
  recurrenceEnd: Date;
}): Date[] => {
  const rule = RRule.fromString(rruleString);
  rule.options.dtstart = dayjs(startDate).toDate();

  const startUtcOffset = dayjs(startDate).utcOffset();

  const recurrenceBetween = rule.between(
    dayjs(startDate).toDate(),
    dayjs(recurrenceEnd).toDate(),
    true
  );

  const times = recurrenceBetween.map((t) => {
    return dayjs.utc(t).add(startUtcOffset - dayjs(t).utcOffset(), "minute");
  });

  return [...times.map((t) => t.toDate())];
};
