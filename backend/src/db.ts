import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg; 

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT) || 5432,
});

export default pool;
