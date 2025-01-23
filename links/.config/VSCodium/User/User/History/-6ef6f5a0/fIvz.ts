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
  host: isInDevMode ? process.env.DB_HOST : process.env.PROD_DB_HOST,
  user: isInDevMode ? process.env.DB_USER : process.env.PROD_DB_USER,
  password: isInDevMode ? process.env.DB_PASSWORD : process.env.PROD_DB_PASSWORD,
  database: isInDevMode ? process.env.DB_NAME : process.env.PROD_DB_NAME,
  connectionLimit: 100,
  waitForConnections: true,
  debug: false,
  multipleStatements: true
};
