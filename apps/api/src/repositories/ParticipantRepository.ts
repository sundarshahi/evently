import { Participant } from "@prisma/client";

import prisma from "../../prisma";
import { ParticipantInput } from "../types";

export const ParticipantRepository = {
  createParticipant: async (data: ParticipantInput): Promise<Participant> =>
    prisma.participant.create({ data }),

  findUniqueParticipant: async (email: string): Promise<Participant | null> => {
    return prisma.participant.findUnique({
      where: {
        email,
      },
    });
  },

  findParticipantsByEvent: async (eventId: string): Promise<Participant[]> => {
    return prisma.participant.findMany({
      where: { event_id: eventId },
    });
  },
};
