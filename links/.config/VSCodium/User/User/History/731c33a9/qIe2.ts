import mysql, { Pool } from 'mysql2/promise';
import { dbConfig } from '../config';
import Logger from '../logger';

class DB {
  private static instance: DB;
  private connection: mysql.Pool | null = null;
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
      this.connection = await mysql.createPool(this.#config);
      Logger.info('Database initialized and connected.');
    } catch (error) {
      Logger.error('Error initializing database:', error);
    }
  }

  public async query<T extends mysql.RowDataPacket[]>(sql: string, params: any[] = []): Promise<T> {
    if (!this.connection) {
      console.error('No connection to MySQL database.');
      return [] as unknown as T;
    }
    try {
      const [results] = await this.connection.query<T>(sql, params);
      return results;
    } catch (error) {
      console.error('Error executing query:', error);
      return [] as unknown as T;
    }
  }

  public async execute(sql: string, params: any[] = []): Promise<number> {
    if (!this.connection) {
      console.error('No connection to MySQL database.');
      return 0;
    }
    try {
      const [result] = await this.connection.execute(sql, params);
      const insertedId = (result as mysql.ResultSetHeader).insertId;

      return insertedId;
    } catch (error) {
      console.error('Error executing query:', error);
      return 0;
    }
  }

  public async close() {
    if (this.connection) {
      await this.connection.end();
      console.log('MySQL connection closed.');
    }
    this.connection = null;
  }

  async getDatabaseSize(): Promise<number> {
    const [rows] = await this.#connection.query(
      `SELECT SUM(data_length + index_length) AS size
       FROM information_schema.TABLES
       WHERE table_schema = DATABASE();`
    );
    return rows[0]?.size || 0; // Size in bytes
  }
}

export default DB;
