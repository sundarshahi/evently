import { createApp } from "./app";

const port = process.env.PORT || 8000;
const server = createApp();

server.listen(port, () => {
  console.log(`api running on ${port}`);
});
