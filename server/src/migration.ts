import { SharedPool, createDatabasePool } from './db';
import { logger } from './logging';
import { migrate } from 'postgres-migrations';

async function runMigrations() {
  await createDatabasePool();
  await migrate({ client: SharedPool.getPool() }, './db_migrations', {
    logger: (msg: string) => logger.info(msg),
  });
}

runMigrations();
