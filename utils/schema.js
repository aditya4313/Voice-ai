import { serial, text, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const voiceai = pgTable('userdetail', {
  id: serial('id').primaryKey(),
  jsonuserresponse: text('jsonuserresponse').notNull(),
  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt'),
  mockId: varchar('mockId').notNull()
});
