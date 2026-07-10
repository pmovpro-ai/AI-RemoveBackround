import { pgTable, serial, varchar, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const stats = pgTable('stats', {
  id: serial('id').primaryKey(),
  imagesProcessed: integer('images_processed').default(0).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
