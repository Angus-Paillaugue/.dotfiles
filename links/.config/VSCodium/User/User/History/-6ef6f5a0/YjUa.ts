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
  user: 'root',
  password: 'APAILL40',
  database: 'logs',
  connectionLimit: 100,
  waitForConnections: true,
  debug: true,
  multipleStatements: true
};
