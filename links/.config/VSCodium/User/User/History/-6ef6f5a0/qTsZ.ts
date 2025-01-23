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

console.log('HOST:');

console.log(isInDevMode ? process.env.DB_HOST : process.env.PROD_DB_HOST);

export const dbConfig = {
  host: isInDevMode ? process.env.DB_HOST : process.env.PROD_DB_HOST,
  user: isInDevMode ? process.env.DB_USER : process.env.MYSQL_USER,
  password: isInDevMode ? process.env.DB_PASSWORD : process.env.MYSQL_PASSWORD,
  database: isInDevMode ? process.env.DB_NAME : process.env.MYSQL_DATABASE,
  connectionLimit: 100,
  waitForConnections: true,
  debug: false,
  multipleStatements: true
};
