import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
import dotenvExpand from "dotenv-expand";

const myEnv = dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
dotenvExpand.expand(myEnv);

// Rest of your config...
console.log(process.env.DATABASE_URL);
export default defineConfig({
  out: "./drizzle",
  schema: "./src/lib/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
