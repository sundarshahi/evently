import { EventInput, Event } from "../types";
import EventRepository from "../repositories/EventRepository";

import { convertToUTC } from "../utils/datetime";

interface EventService {
  createEvent(data: EventInput): Promise<void>;
  getAllEvents(skip: number, take: number): Promise<Event[]>;
}

export const EventServiceFactory = (): EventService => {
  const findOverlappingEvents = async (
    startTime: Date,
    endTime: Date,
    timezone: string
  ): Promise<Event[]> =>
    EventRepository.findOverlappingEvents(startTime, endTime, timezone);

  const createEvent = async (data: EventInput): Promise<void> => {
    const { start_time, end_time, time_zone } = data;

    const overlappingEvents = await findOverlappingEvents(
      start_time,
      end_time,
      time_zone
    );

    if (overlappingEvents.length > 0) {
      throw new Error("Event overlaps with existing events.");
    }

    const utcStartTime = convertToUTC(start_time, time_zone);
    const utcEndTime = convertToUTC(end_time, time_zone);

    EventRepository.createEvent({
      ...data,
      start_time: utcStartTime,
      end_time: utcEndTime,
    });
  };
  const getAllEvents = async (
    skip: number = 0,
    take: number = 10
  ): Promise<Event[]> => EventRepository.findAllEvents(skip, take);

  return {
    createEvent,
    getAllEvents,
  };
};
