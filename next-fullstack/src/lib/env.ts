import "server-only";
import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().default(3000),
    // Thêm biến môi trường khác tại đây...
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    const message = Object.entries(fieldErrors)
        .map(([k, v]) => `${k}: ${v?.join(", ")}`)
        .join("\n");
    throw new Error("Invalid environment variables:\n" + message);
}

export const env = parsed.data;
export type Env = z.infer<typeof envSchema>;
// only import env in server-side code
// never import env in client-side code
