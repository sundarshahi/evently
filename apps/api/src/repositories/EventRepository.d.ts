import { EventInput, Event } from "../types";
export declare const EventRepository: {
    createEvent: (data: EventInput) => Promise<Event>;
    createManyEvents: (data: EventInput[]) => Promise<void>;
    updateEvent: (id: string, data: Partial<EventInput>) => Promise<Event | null>;
    deleteEvent: (id: string) => Promise<Event | null>;
    findAllEvents: (skip?: number, take?: number) => Promise<Event[]>;
    findEventById: (id: string) => Promise<Event | null>;
    findOverlappingEvents: (start: Date, end: Date, timeZone: string) => Promise<Event[]>;
};
//# sourceMappingURL=EventRepository.d.ts.map