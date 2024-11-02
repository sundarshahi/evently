import { Request, Response } from "express";

import { ParticipantServiceFactory } from "@/services/ParticipantService";
import {
  eventIdSchema,
  participantSchema,
} from "@/validators/participantValidator";

const participantService = ParticipantServiceFactory();

export const rsvpToEventHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { eventId } = req.params;

    const { data: params, error: idSchemaError } = eventIdSchema.safeParse({
      eventId,
    });

    const { error: bodySchemaError, data } = participantSchema.safeParse(
      req.body
    );

    const ValidationError = bodySchemaError || idSchemaError;

    if (ValidationError) {
      return res.status(400).json({
        error: "Validation Error",
        issues: ValidationError.errors,
      });
    }
    const payload = {
      event_id: params.eventId,
      ...data,
    };

    const participant = await participantService.createParticipant(payload);

    return res.status(201).json(participant);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const listParticipantsOfEventHandler = async (
  req: Request,
  res: Response
) => {
  const { eventId } = req.params;
  const { data, error: ValidationError } = eventIdSchema.safeParse({ eventId });

  if (ValidationError) {
    return res.status(400).json({
      error: "Validation Error",
      issues: ValidationError.errors,
    });
  }

  try {
    const participants = await participantService.getParticipantsByEvent(
      data.eventId
    );
    if (!participants) {
      return res
        .status(404)
        .json({ error: "Event not found or has no participants" });
    }
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch participants" });
  }
};
