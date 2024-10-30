import { createApp } from "./app";
import { log } from "@repo/logger";

const port = process.env.PORT || 8000;
const server = createApp();

server.listen(port, () => {
  log(`api running on ${port}`);
});
