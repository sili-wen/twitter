import { drizzle } from 'drizzle-orm/node-postgres';
import env from '~/env';

const db = drizzle(env.TWITTER_DATABASE_CONNECTION);

export default db;
