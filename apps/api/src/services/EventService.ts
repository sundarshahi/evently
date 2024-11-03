import { EventInput } from "../types";
import { Event } from "@repo/db/client";
import { convertToUTC } from "@/utils/datetime";
import { EventRepository } from "@/repositories/EventRepository";
import { scheduleRecurringEvent } from "@/task/eventInstance/scheduler";

interface EventService {
  createEvent(data: EventInput): Promise<void>;
  getAllEvents(skip: number, take: number): Promise<Event[]>;
  createRecurringInstance(
    parentEventId: string,
    startTime: Date,
    endTime: Date,
    createdBy: string
  ): Promise<void>;
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

    const parentEvent = await EventRepository.createEvent({
      ...data,
      start_time: utcStartTime,
      end_time: utcEndTime,
    });

    if (parentEvent.recurrence_rule && parentEvent.recurrence_end) {
      await scheduleRecurringEvent(
        parentEvent,
        parentEvent.recurrence_rule,
        parentEvent.recurrence_end
      );
    }
  };
  const createRecurringInstance = async (
    parentEventId: string,
    startTime: Date,
    endTime: Date,
    createdBy: string
  ) => {
    await EventRepository.createEventInstance(
      parentEventId,
      startTime,
      endTime,
      createdBy
    );
  };

  const getAllEvents = async (
    skip: number = 0,
    take: number = 10
  ): Promise<Event[]> => EventRepository.findAllEvents(skip, take);

  return {
    createEvent,
    createRecurringInstance,
    getAllEvents,
  };
};
