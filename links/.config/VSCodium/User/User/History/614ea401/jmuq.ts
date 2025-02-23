import mysql from 'mysql2/promise';
import { dbConfig } from '../config';

class DB {
  private static instance: DB;
  private connection: mysql.Pool | null = null;

  private constructor() {}

  public static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }

  public async query<T extends mysql.RowDataPacket[]>(sql: string, params: any[] = []): Promise<T> {
    if (!this.connection) {
      console.error("No connection to MySQL database.");
      return [] as unknown as T;
    }
    try {
      const [results] = await this.connection.query<T>(sql, params);
      return results;
    } catch (error) {
      console.error("Error executing query:", error);
      return [] as unknown as T;
    }
  }

  public async execute(sql: string, params: any[] = []): Promise<number> {
    if (!this.connection) {
      console.error("No connection to MySQL database.");
      return 0;
    }
    try {
      const [result] = await this.connection.execute(sql, params);
      const insertedId = (result as mysql.ResultSetHeader).insertId;

      return insertedId;
    } catch (error) {
      console.error("Error executing query:", error);
      return 0;
    }
  }

  public async close() {
    if (this.connection) {
      await this.connection.end();
      console.log("MySQL connection closed.");
    }
    this.connection = null;
  }
}

export default DB;
