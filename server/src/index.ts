import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initializeDatabase } from "./utils/initDb";
import { errorHandler } from "./middleware/errorHandler";
import uploadRoutes from "./routes/uploadRoutes";
import productRoutes from "./routes/productRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize DB on first request
let dbInitialized = false;
app.use(async (_req: Request, _res: Response, next: NextFunction) => {
  if (!dbInitialized) {
    try {
      await initializeDatabase();
      dbInitialized = true;
    } catch (err) {
      console.error("DB init failed:", err);
    }
  }
  next();
});

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

// Local dev only — Vercel ignores this
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Vercel needs module.exports for Express apps
module.exports = app;
export default app;
