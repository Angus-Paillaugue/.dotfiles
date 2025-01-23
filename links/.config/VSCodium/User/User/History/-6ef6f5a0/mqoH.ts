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
  host: isInDevMode ? process.env.DB_HOST : process.env.ROOT_USER,
  user: isInDevMode ? process.env.DB_USER : process.env.ROOT_USER,
  password: isInDevMode ? process.env.DB_PASSWORD : process.env.ROOT_USER,,
  database: isInDevMode ? process.env.DB_NAME : process.env.ROOT_USER,,
  connectionLimit: 100,
  waitForConnections: true,
  debug: false,
  multipleStatements: true
};
