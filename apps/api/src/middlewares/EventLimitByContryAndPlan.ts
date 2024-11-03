import dayjs from "dayjs";
import { Request, Response, NextFunction } from "express";

import { EventRepository } from "@/src/repositories/eventRepository";

const COUNTRY_LIMITS: Record<string, number> = {
  IN: 3,
  JP: 3,
};
//TODO: fetch from User Model
const usersDetail = [
  { country: "IN", isPremium: false },
  { country: "JP", isPremium: false },
  { country: "US", isPremium: true },
  { country: "IN", isPremium: true },
  { country: "JP", isPremium: false },
];

export const checkEventLimitByCountryAndPlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const randomUser =
    usersDetail[Math.floor(Math.random() * usersDetail.length)];
  const { created_by, start_time } = req.body;

  const country = randomUser.country;
  const isPremiumUser = randomUser.isPremium;
  const maxFreeEvents = COUNTRY_LIMITS[country] || null;

  const now = dayjs(new Date()).toDate();
  const startTime = dayjs(start_time).toDate();
  if (!created_by) {
    return res.status(400).json({ error: "user not found!" });
  }
  if (startTime < now) {
    return res
      .status(400)
      .json({ error: "Event start time cannot be in the past." });
  }

  if (!maxFreeEvents) {
    return next();
  }

  const weekStart = dayjs().subtract(1, "week").toDate();

  try {
    const eventsCount = await EventRepository.countWeeklyEventByUser(
      created_by,
      weekStart
    );

    if (eventsCount >= maxFreeEvents && !isPremiumUser) {
      return res.status(403).json({
        error: `Free event limit reached. Upgrade to premium to create more events.`,
      });
    }
  } catch (error) {
    console.error("Event limit check failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }

  next();
};
