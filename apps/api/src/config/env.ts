import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  BASE_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
  PORT: z.string().transform(Number).default("8000"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
