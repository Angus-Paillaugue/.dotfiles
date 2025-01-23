import 'dotenv/config';

const isInProdMode = process.env.NODE_ENV == 'production';

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
  host: isInProdMode ? process.env.PROD_DB_HOST : process.env.DEV_DB_HOST,
  user: isInProdMode ? process.env.MYSQL_USER : process.env.DEV_DB_USER,
  password: isInProdMode ? process.env.MYSQL_PASSWORD : process.env.DEV_DB_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 100,
  waitForConnections: true,
  debug: false,
  multipleStatements: true
};
