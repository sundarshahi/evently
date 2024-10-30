import { Router } from "express";
import {
  createEventHandler,
  listEventHandler,
} from "../controllers/EventController";

import {
  rsvpToEventHandler,
  listParticipantsOfEventHandler,
} from "../controllers/ParticipantController";

const router = Router();

router.post("/", createEventHandler);
/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Meeting"
 *               description:
 *                  type: string
 *                  example: "Interview Schedule"
 *               start_time:
 *                 type: datetime
 *                 example: "2023-12-12T10:00:00Z"
 *               end_time:
 *                 type: datetime
 *                 example: "2023-12-12T11:00:00Z"
 *               time_zone:
 *                 type: string
 *                 example: "America/New_York"
 *               location:
 *                  type: string
 *                  example: "Nepal"
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *          description: Validation error
 */

router.get("/", listEventHandler);

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Retrieve all events
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           example: 0
 *         description: Number of events to skip for pagination.
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of events to return.
 *     responses:
 *       200:
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "9f77fca0-fdb5-4b9e-a112-fd7543a10f25"
 *                   title:
 *                     type: string
 *                     example: "Meeting"
 *                   description:
 *                     type: string
 *                     example: "Interview Schedule"
 *                   start_time:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-12-12T10:00:00Z"
 *                   end_time:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-12-12T11:00:00Z"
 *                   time_zone:
 *                     type: string
 *                     example: "America/New_York"
 *                   location:
 *                     type: string
 *                     example: "Nepal"
 *       500:
 *         description: Internal server error
 */

router.post("/:eventId/rsvp/", rsvpToEventHandler);
/**
 * @swagger
 * /api/events/{eventId}/rsvp:
 *   post:
 *     summary: Add a participant to an event
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: The ID of the event to which the participant will be added
 *         schema:
 *           type: string
 *           example: "9f77fca0-fdb5-4b9e-a112-fd7543a10f25"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               rsvp_status:
 *                 type: string
 *                 enum: [accepted, declined, pending]
 *                 example: "pending"
 *     responses:
 *       201:
 *         description: Participant added successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */

router.get("/:eventId/participants/", listParticipantsOfEventHandler);
/**
 * @swagger
 * /api/events/{eventId}/participants:
 *   get:
 *     summary: Get participants of an event
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         schema:
 *           type: string
 *         required: true
 *         description: The event ID
 *     responses:
 *       200:
 *         description: List of participants for the event
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1f2e4bda-b8e3-423d-b97c-9b5a18cfa6d1"
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "johndoe@example.com"
 *                   rsvp_status:
 *                     type: string
 *                     example: "accepted"
 *       404:
 *         description: Event not found or has no participants
 *       500:
 *         description: Failed to fetch participants
 */

export default router;
