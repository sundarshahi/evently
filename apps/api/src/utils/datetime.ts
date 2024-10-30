import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const convertToUTC = (date: Date, timeZone: string): Date => {
  return dayjs.tz(date, timeZone).utc().toDate();
};
