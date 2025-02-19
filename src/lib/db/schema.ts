// src/lib/schema.ts
import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
});

export const tasks = mysqlTable("tasks", {
    id: int("id").primaryKey().autoincrement(),
    title: varchar("title", { length: 255 }).notNull(),
    priority: int("priority").notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    userId: int("userId").notNull(),
});