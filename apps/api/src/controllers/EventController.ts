import { Request, Response } from "express";

import { EventInput } from "../types";
import { EventServiceFactory } from "../services/EventService";
import { eventSchema } from "../validators/eventValidator";

const eventService = EventServiceFactory();

export const createEventHandler = async (
  req: Request<{}, {}, EventInput>,
  res: Response
) => {
  try {
    const {
      error: ValidationError,
      data,
      success: isValid,
    } = eventSchema.safeParse(req.body);

    if (ValidationError) {
      res.status(400).json({
        error: "Validation Error",
        issues: ValidationError.errors,
      });
    }

    if (isValid) {
      const { start_time, end_time, ...rest } = data;

      const eventData = {
        ...rest,
        start_time: new Date(start_time),
        end_time: new Date(end_time),
      };
      const event = await eventService.createEvent(eventData);
      return res
        .status(201)
        .json({ message: "Event created successfully", event });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    if (!res.headersSent) {
      return res.status(500).json({ error: "Failed to create event" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const listEventHandler = async (req: Request, res: Response) => {
  try {
    const { skip = 0, take = 10 } = req.query;

    const skipCount = Number(skip);
    const takeCount = Number(take);

    const events = await eventService.getAllEvents(skipCount, takeCount);
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
