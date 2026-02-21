import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const connectDB = async (): Promise<void> => {
  const client = await pool.connect();
  console.log("PostgreSQL connected successfully");
  client.release();
};

export default pool;
