import { Connection } from './Connection.js';
import { Pool as PromisePool } from '.pnpm/mysql2@3.11.5/node_modules/mysql2/promise';

declare class PoolConnection extends Connection {
  connection: Connection;
  release(): void;
  promise(promiseImpl?: PromiseConstructor): PromisePool;
}

export { PoolConnection };
