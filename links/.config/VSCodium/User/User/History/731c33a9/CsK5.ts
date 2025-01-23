import mysql, { Pool } from 'mysql2/promise';
import { dbConfig } from '../config';
import Logger from '../logger';

class DB {
  private static instance: DB;
  private pool: mysql.Pool | null = null;
  #config = dbConfig;

  private constructor() {
    this.initialize();
  }

  public static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }

  private async initialize() {
    try {
      this.pool = new Pool(this.#config);
      Logger.info('Database initialized and connected.');
    } catch (error) {
      Logger.error('Error initializing database:', error);
    }
  }

  public async query<T extends mysql.RowDataPacket[]>(sql: string, params: any[] = []): Promise<T> {
    if (!this.pool) {
      console.error('No connection to MySQL database.');
      return [] as unknown as T;
    }
    try {
      const [results] = await this.pool.query<T>(sql, params);
      return results;
    } catch (error) {
      console.error('Error executing query:', error);
      return [] as unknown as T;
    }
  }

  public async execute(sql: string, params: any[] = []): Promise<number> {
    if (!this.pool) {
      console.error('No connection to MySQL database.');
      return 0;
    }
    try {
      const [result] = await this.pool.execute(sql, params);
      const insertedId = (result as mysql.ResultSetHeader).insertId;

      return insertedId;
    } catch (error) {
      console.error('Error executing query:', error);
      return 0;
    }
  }

  public async close() {
    if (this.pool) {
      await this.pool.end();
      console.log('MySQL connection closed.');
    }
    this.pool = null;
  }
}

export default DB;
