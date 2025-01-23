import mysql from 'mysql2/promise';

class DB {
  private static instance: DB;
  private connection: mysql.Connection | null = null;

  private constructor() {}

  public static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }

  public async connect(config: mysql.ConnectionOptions) {
    if (this.connection) return; // Avoid reconnecting
    this.connection = await mysql.createConnection(config);
    console.log("Connected to MySQL database.");
  }

  public async query<T>(sql: string, params: any[] = []): Promise<T[]> {
    if (!this.connection) {
      throw new Error("Database not connected.");
    }
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
