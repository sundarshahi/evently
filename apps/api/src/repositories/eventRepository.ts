import { prisma } from "../config/db";
import { EventInput, Event } from "../types";

export const EventRepository = {
  createEvent: async (data: EventInput): Promise<Event> =>
    prisma.event.create({ data }),

  createManyEvents: async (data: EventInput[]): Promise<void> => {
    prisma.event.createMany({ data });
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
};
