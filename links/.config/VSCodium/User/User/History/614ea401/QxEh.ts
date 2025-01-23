import mysql from 'mysql2/promise';
import { dbConfig } from '../config';

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
      await this.query(`
        CREATE TABLE IF NOT EXISTS logs (
          id INT AUTO_INCREMENT PRIMARY KEY,
          level VARCHAR(50) NOT NULL,
          message TEXT NOT NULL,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log("Database initialized and connected.");
    } catch (error) {
      console.error("Error initializing database:", error);
    }
  }

  public async query<T>(sql: string, params: any[] = []): Promise<T[]> {
    if (!this.connection) {
      console.error("No connection to MySQL database.");
      return [];
    }
    try {
      const [results] = await this.connection.execute<T[]>(sql, params);
      return results;
    } catch (error) {
      console.error("Error executing query:", error);
      return [];
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
