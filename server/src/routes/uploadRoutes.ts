import { Router } from "express";
import upload from "../upload";
import { uploadFile } from "../controllers/uploadController";

const router = Router();

router.post("/", upload.single("file"), uploadFile);

export default router;
