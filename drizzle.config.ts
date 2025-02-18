import type { Config } from "drizzle-kit";
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export default {
  schema: "./src/lib/schema.ts",  // Update this path to match your actual schema location
  out: "./drizzle",
  driver: 'mysql2',
  dbCredentials: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }
} satisfies Config;