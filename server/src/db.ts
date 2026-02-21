import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Strip channel_binding param — not supported in all serverless runtimes
const connectionString = (process.env.DATABASE_URL || "").replace(
  /[&?]channel_binding=[^&]*/g,
  ""
);

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

export const connectDB = async (): Promise<void> => {
  const client = await pool.connect();
  console.log("PostgreSQL connected successfully");
  client.release();
};

export default pool;
