import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string(),
  ACCOUNT_DIR: z.string(),
  KEYS_FOLDER: z.string(),
  IMPORT_DONATION_DIR: z.string(),
  IMPORT_ITEM_DIR: z.string(),
});

export const env = envSchema.parse(process.env);
