import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import routes from "./routes";

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

  app.use("/api", routes);

  // Swagger Documentation
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup());

  return app;
};
