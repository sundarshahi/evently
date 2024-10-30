import swaggerAutogen from "swagger-autogen";

import { env } from "./env";
import apiRoutes from "../routes";

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: env.BASE_URL,
};

const outputFile = "./swagger-output.json";
const routes = [apiRoutes];

swaggerAutogen(outputFile, routes, doc);
