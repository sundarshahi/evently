import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./config/swaggerConfig";

export const createApp = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/ping", (_, res) => {
      return res.json({ ok: true });
    });

  // Swagger Documentation
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.use("/api/events", []);

  return app;
};
