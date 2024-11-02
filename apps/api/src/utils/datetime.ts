import { dayjs } from "./dayjs";

export const convertToUTC = (date: Date, timeZone: string): Date => {
  return dayjs.tz(date, timeZone).utc().toDate();
};
