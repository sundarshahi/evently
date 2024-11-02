import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

import { env } from "./env";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Scheduling API",
      version: "1.0.0",
      description: "API documentation for the Event Scheduling System",
    },
    servers: [
      {
        url: env.BASE_URL,
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

export function setupSwagger(app: Express) {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger documentation available at ${env.BASE_URL}/api/docs`);
}
