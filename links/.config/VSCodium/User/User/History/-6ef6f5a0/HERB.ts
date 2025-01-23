import 'dotenv/config';

const isInDevMode = process.env.NODE_ENV === 'development';

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
  host: isInDevMode ? process.env.DB_HOST : 'db',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 100,
  waitForConnections: true,
  debug: false,
  multipleStatements: true
};
