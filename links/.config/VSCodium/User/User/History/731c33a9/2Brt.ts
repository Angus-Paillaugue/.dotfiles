import mysql from 'mysql2/promise';
import { dbConfig } from '../config';

class DB {
  private connection: mysql.Connection | null = null;
  private static instance: DB | null = null;

  public async connect(): Promise<void> {
    this.connection = await mysql.createConnection(dbConfig);
  }

  public async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
    }
  }

  private constructor() {
    this.connect();
  }

  public getConnection(): mysql.Connection | null {
    return this.connection;
  }

  public static getInstance(): DB {
    if (!this.instance) {
      this.instance = new DB();
    }
    return this.instance;
  }

  public async query<T extends mysql.RowDataPacket[]>(sql: string, params: any[] = []): Promise<T> {
    const db = DB.getInstance().getConnection();
    if (!db) {
      console.error('No connection to MySQL database.');
      return [] as unknown as T;
    }
    try {
      const [results] = await db.query<T>(sql, params);
      return results;
    } catch (error) {
      console.error('Error executing query:', error);
      return [] as unknown as T;
    }
  }

  public async execute(sql: string, params: any[] = []): Promise<number> {
    const db = DB.getInstance().getConnection();
    if (!db) {
      console.error('No connection to MySQL database.');
      return 0;
    }
    try {
      const [result] = await db.execute(sql, params);
      const insertedId = (result as mysql.ResultSetHeader).insertId;

      return insertedId;
    } catch (error) {
      console.error('Error executing query:', error);
      return 0;
    }
  }

  async getDatabaseSize(): Promise<number> {
    const dbName = dbConfig.database;

    const [rows] = await this.query(
      `SELECT SUM(data_length + index_length) AS size
       FROM information_schema.TABLES
       WHERE table_schema = ?;`,
      [dbName]
    );

    return rows.size || 0; // Size in bytes
  }
}

export default DB;
