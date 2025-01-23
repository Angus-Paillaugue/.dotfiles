import mysql from 'mysql2/promise';
import { dbConfig } from '../config';

class DB {
  private static instance: DB;
  private connection: mysql.Connection | null = null;
  #config = dbConfig;

  private constructor() {
    // Create database
    this.query(`
      CREATE DATABASE IF NOT EXISTS logs;
      USE logs;
      CREATE TABLE IF NOT EXISTS logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        level VARCHAR(50) NOT NULL,
        message TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }

  public async connect() {
    if (this.connection) return; // Avoid reconnecting
    this.connection = await mysql.createConnection(this.#config);
    console.log("Connected to MySQL database.");
  }

  public async query<T>(sql: string, params: any[] = []): Promise<T[]> {
    const connection = this.connection;
    const [results] = await this.connection.execute<T[]>(sql, params);
    return results;
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
