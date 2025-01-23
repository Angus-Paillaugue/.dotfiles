import 'dotenv/config';

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
  host: process.env.MYSQL_USER_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'logify',
  connectionLimit: 100,
  waitForConnections: true,
  debug: false,
  multipleStatements: true
};
