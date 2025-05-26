import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
import { ulid } from 'ulid';

const SEPARATOR = '_';
const entityId = (prefix: string) => `${prefix}${SEPARATOR}${ulid()}`;

const idColumn = (prefix: string) => {
  return {
    id: varchar('id', { length: 64 })
      .primaryKey()
      .$defaultFn(() => entityId(prefix)),
  };
};

const auditColumns = () => {
  return {
    createdAt: timestamp('created_at', { precision: 3 })
      .notNull()
      .default(new Date()),
    updatedAt: timestamp('updated_at', { precision: 3 })
      .notNull()
      .default(new Date())
      .$onUpdate(() => new Date()),
    terminatedAt: timestamp('terminated_at', { precision: 3 }),
  };
};

export const tweets = pgTable('tweets', {
  ...idColumn('twt'),
  message: varchar('message', { length: 512 }).notNull(),
  ...auditColumns(),
});
