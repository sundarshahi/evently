import { Queue, Worker } from "bullmq";
import Redis from "ioredis";
import { env } from "./env";

const redisConnection = new Redis(
  env.REDIS_URL + "?family=0" || "redis://localhost:6379",
  {
    maxRetriesPerRequest: null,
  }
);

const eventQueue = new Queue("events", {
  connection: redisConnection,
});

const createWorker = (name: string, processor: any) => {
  return new Worker(name, processor, {
    connection: redisConnection,
  });
};

export { redisConnection, createWorker, eventQueue };
