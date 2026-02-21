import { Request, Response, NextFunction } from "express";
import fs from "fs";
import pool from "../db";
import { parseFile } from "../utils/parseFile";

export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const rows = parseFile(req.file.path);

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query("TRUNCATE TABLE products RESTART IDENTITY");

      const chunkSize = 100;
      for (let i = 0; i < rows.length; i += chunkSize) {
        const chunk = rows.slice(i, i + chunkSize);
        const values: unknown[] = [];
        const placeholders: string[] = [];

        chunk.forEach((row, idx) => {
          const base = idx * 12;
          placeholders.push(
            `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5}, $${base + 6}, $${base + 7}, $${base + 8}, $${base + 9}, $${base + 10}, $${base + 11}, $${base + 12})`
          );
          values.push(
            row.product_id,
            row.product_name,
            row.category,
            row.discounted_price,
            row.actual_price,
            row.discount_percentage,
            row.rating,
            row.rating_count,
            row.about_product,
            row.user_name,
            row.review_title,
            row.review_content
          );
        });

        await client.query(
          `INSERT INTO products (product_id, product_name, category, discounted_price, actual_price, discount_percentage, rating, rating_count, about_product, user_name, review_title, review_content)
           VALUES ${placeholders.join(", ")}`,
          values
        );
      }

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }

    // Delete temp file
    fs.unlink(req.file.path, () => {});

    res.json({ message: "File uploaded and data imported successfully", rowCount: rows.length });
  } catch (err) {
    next(err);
  }
};
