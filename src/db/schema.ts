import { pgTable, varchar, timestamp, index } from 'drizzle-orm/pg-core';
import { ulid } from 'ulid';

const SEPARATOR = '_';
const entityId = (prefix: string) => {
  return `${prefix}${SEPARATOR}${ulid()}`;
};

const idColumn = (prefix: string) => {
  return {
    id: varchar('id', { length: 64 })
      .primaryKey()
      .notNull()
      .$defaultFn(() => entityId(prefix)),
  };
};

const auditColumns = () => {
  return {
    createdAt: timestamp('created_at', {
      precision: 3,
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', {
      precision: 3,
      withTimezone: true,
    })
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
    terminatedAt: timestamp('terminated_at', {
      precision: 3,
      withTimezone: true,
    }),
  };
};

export const tweets = pgTable('tweets', {
  ...idColumn('twt'),
  message: varchar('message', { length: 512 }).notNull(),
  userId: varchar('user_id', { length: 64 })
    .references(() => users.id)
    .notNull(),
  ...auditColumns(),
});

export const users = pgTable(
  'users',
  {
    ...idColumn('usr'),
    firstName: varchar('first_name', { length: 64 }).notNull(),
    lastName: varchar('last_name', { length: 64 }).notNull(),
    email: varchar('email', { length: 128 }).notNull().unique(),
    ...auditColumns(),
  },
  table => [index('users_email_idx').on(table.email)]
);

export type Tweet = typeof tweets.$inferSelect;
export type NewTweet = typeof tweets.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
