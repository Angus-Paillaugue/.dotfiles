import dotenv from "dotenv";

dotenv.config();

export interface dbConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  connectionLimit: number;
  waitForConnections: boolean;
  debug: boolean;
  multipleStatements: boolean;
}

export const dbConfig = {
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'logs',
  connectionLimit: 100,
  waitForConnections: true,
  debug: false,
  multipleStatements: true
};
