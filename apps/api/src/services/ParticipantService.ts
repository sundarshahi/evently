import { Participant } from "@repo/db/client";

import { ParticipantInput } from "../types";
import { ParticipantRepository } from "@/repositories/ParticipantRepository";
import { EventRepository } from "@/src/repositories/eventRepository";

interface ParticipantService {
  createParticipant(data: ParticipantInput): Promise<Participant>;
  getParticipantsByEvent(eventId: string): Promise<Participant[]>;
}

export const ParticipantServiceFactory = (): ParticipantService => {
  return {
    async createParticipant(data: ParticipantInput): Promise<Participant> {
      const event = await EventRepository.findEventById(data.event_id);
      if (!event) {
        throw new Error(`Event with ID ${data.event_id} does not exist`);
      }
      const existingParticipant =
        await ParticipantRepository.findUniqueParticipant(data.email);

      if (existingParticipant) {
        throw new Error(
          "A participant with this email already exists for this event."
        );
      }

      return ParticipantRepository.createParticipant(data);
    },

    async getParticipantsByEvent(eventId: string): Promise<Participant[]> {
      return ParticipantRepository.findParticipantsByEvent(eventId);
    },
  };
};
