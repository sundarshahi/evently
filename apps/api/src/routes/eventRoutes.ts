import { Router } from "express";
import {
  createEventHandler,
  listEventHandler,
} from "../controllers/EventController";

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

export default router;
