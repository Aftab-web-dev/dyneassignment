import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db";
import upload from "./upload";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Server is running" });
});

// Single file upload
app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  res.json({
    message: "File uploaded successfully",
    file: {
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    },
  });
});

// Multiple file upload
app.post("/upload-multiple", upload.array("files", 10), (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    res.status(400).json({ error: "No files uploaded" });
    return;
  }
  res.json({
    message: `${files.length} file(s) uploaded successfully`,
    files: files.map((f) => ({
      filename: f.filename,
      originalname: f.originalname,
      size: f.size,
      mimetype: f.mimetype,
    })),
  });
});

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start();
