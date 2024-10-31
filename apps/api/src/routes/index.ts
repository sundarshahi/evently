import { Router } from "express";
import eventRoutes from "./eventRoutes";

const router: Router = Router();

router.use("/events", eventRoutes);

export default router;
