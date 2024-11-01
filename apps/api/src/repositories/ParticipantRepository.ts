import { Participant } from "@repo/db/client";

import prisma from "@repo/db";

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
