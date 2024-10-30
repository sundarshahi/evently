import { Router } from "express";

const router = Router();

router.use("/events", (_, res) => {
  return res.json({ ok: true });
});

export default router;
