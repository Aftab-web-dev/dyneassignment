import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";
import { initializeDatabase } from "./utils/initDb";
import { errorHandler } from "./middleware/errorHandler";
import uploadRoutes from "./routes/uploadRoutes";
import productRoutes from "./routes/productRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Server is running" });
});

// API routes
app.use("/api/upload", uploadRoutes);
app.use("/api/products", productRoutes);
app.use("/api/analytics", analyticsRoutes);

// Error handler
app.use(errorHandler);

const start = async () => {
  await connectDB();
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start();
