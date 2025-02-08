import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string(),
  ACCOUNT_DIR: z.string(),
  KEYS_FOLDER: z.string(),
});

export const env = envSchema.parse(process.env);
