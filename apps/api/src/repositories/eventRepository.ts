import prisma from "@repo/db";
import { Event, EventInstance } from "@repo/db/client";

import { EventInput } from "../types";

export const EventRepository = {
  createEvent: async (data: EventInput): Promise<Event> =>
    prisma.event.create({ data }),

  createEventInstance: async (
    parentEventId: string,
    startTime: Date,
    endTime: Date,
    createdBy: string
  ): Promise<EventInstance> => {
    return prisma.eventInstance.create({
      data: {
        parent_event_id: parentEventId,
        start_time: startTime,
        end_time: endTime,
        created_by: createdBy,
      },
    });
  },
  createManyEventInstance: async (
    instances: {
      parent_event_id: string;
      start_time: Date;
      end_time: Date;
      created_by: string;
    }[]
  ): Promise<void> => {
    await prisma.eventInstance.createMany({
      data: instances,
      skipDuplicates: true,
    });
  },

  createManyEvents: async (data: EventInput[]): Promise<void> => {
    await prisma.event.createMany({ data });
  },

  updateEvent: async (
    id: string,
    data: Partial<EventInput>
  ): Promise<Event | null> =>
    prisma.event.update({
      where: { id },
      data,
    }),

  deleteEvent: async (id: string): Promise<Event | null> => {
    return prisma.event.delete({
      where: { id },
    });
  },

  findAllEvents: async (
    skip: number = 0,
    take: number = 10
  ): Promise<Event[]> => {
    return prisma.event.findMany({
      skip,
      take,
      orderBy: { start_time: "asc" },
    });
  },

  findEventById: async (id: string): Promise<Event | null> => {
    return prisma.event.findUnique({
      where: { id },
    });
  },

  findOverlappingEvents: async (
    start: Date,
    end: Date,
    timeZone: string
  ): Promise<Event[]> => {
    return prisma.event.findMany({
      where: {
        time_zone: timeZone,
        start_time: { lt: end },
        end_time: { gt: start },
      },
    });
  },

  async checkOverlappingEventsAndInstances(
    timeRanges: { startTime: Date; endTime: Date }[]
  ): Promise<Event[]> {
    const orConditions = timeRanges.flatMap(({ startTime, endTime }) => [
      {
        AND: [{ start_time: { lt: endTime } }, { end_time: { gt: startTime } }],
      },
      {
        instances: {
          some: {
            start_time: { lt: endTime },
            end_time: { gt: startTime },
          },
        },
      },
    ]);
    const overlappingEvents = await prisma.event.findMany({
      where: {
        OR: orConditions,
      },
      include: {
        instances: true,
      },
    });

    return overlappingEvents;
  },
};
