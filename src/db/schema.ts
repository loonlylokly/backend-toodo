import { sql } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }).notNull().unique(),
  text: text('text').notNull(),
  datetime: text('datetime')
    .notNull()
    .default(sql`current_timestamp`),
});

// Schema for inserting a user - can be used to validate API requests
export const insertTaskSchema = createInsertSchema(tasks);
// Schema for selecting a user - can be used to validate API responses
export const selectTaskSchema = createSelectSchema(tasks);
// Zod schema type is also inferred from the table schema, so you have full type safety
export const requestSchema = selectTaskSchema.pick({ id: true });

export type TSelectTask = typeof selectTaskSchema._type; // return type when queried
export type TInsertTask = typeof insertTaskSchema._type; // insert type
export type TTaskId = typeof requestSchema._type.id;
