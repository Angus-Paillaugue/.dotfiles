import 'dotenv/config';

export const dbConfig = {
  host: process.env.NODE_ENV === 'development' ? 'localhost' : process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10,
  waitForConnections: true,
  debug: false,
  multipleStatements: true
};
