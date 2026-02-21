import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const connectDB = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    console.log("PostgreSQL connected successfully");
    client.release();
  } catch (error) {
    console.error("PostgreSQL connection error:", error);
    process.exit(1);
  }
};

export default pool;
