import z from "zod";
import "dotenv/config";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().int().min(0).max(65535),
  FRONTEND_URL: z.url(),
  DATABASE_URL: z.url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  CLOUDINARY_CLOUD_NAME: z.string().min(5),
  CLOUDINARY_API_KEY: z.string().min(10),
  CLOUDINARY_API_SECRET: z.string().min(20),
  STRIPE_SECRET_KEY:z.string().min(20)
});

const { success, data, error } = envSchema.safeParse(process.env);
if (!success) {
  console.log("env validation failed");
  console.log(z.prettifyError(error));
  process.exit(1);
}

export const env = data ;
