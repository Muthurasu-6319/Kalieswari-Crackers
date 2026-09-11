import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config(); // Reads from cwd when running 'node server/init-db.js'

const pool = mysql.createPool({
  uri: `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?ssl={"rejectUnauthorized":true}`,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
