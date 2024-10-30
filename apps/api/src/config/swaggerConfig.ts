import swaggerJsDoc from "swagger-jsdoc";
import { env } from "./env";

const swaggerOptions = {
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

export default swaggerJsDoc(swaggerOptions);
