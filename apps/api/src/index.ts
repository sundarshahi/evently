import { createApp } from "./app";

const PORT = process.env.PORT || 8000;
const server = createApp();

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
