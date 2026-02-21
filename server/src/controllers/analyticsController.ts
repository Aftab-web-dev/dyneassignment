import { Request, Response, NextFunction } from "express";
import pool from "../db";

export const getProductsPerCategory = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await pool.query(
      `SELECT SPLIT_PART(category, '|', 1) AS category, COUNT(*) AS count
       FROM products
       WHERE category IS NOT NULL AND category != ''
       GROUP BY SPLIT_PART(category, '|', 1)
       ORDER BY count DESC`
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

export const getTopReviewed = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await pool.query(
      `SELECT product_name, rating_count, rating
       FROM products
       ORDER BY rating_count DESC
       LIMIT 10`
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

export const getDiscountDistribution = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await pool.query(
      `SELECT
         CASE
           WHEN discount_percentage >= 0 AND discount_percentage < 0.1 THEN '0-10%'
           WHEN discount_percentage >= 0.1 AND discount_percentage < 0.2 THEN '10-20%'
           WHEN discount_percentage >= 0.2 AND discount_percentage < 0.3 THEN '20-30%'
           WHEN discount_percentage >= 0.3 AND discount_percentage < 0.4 THEN '30-40%'
           WHEN discount_percentage >= 0.4 AND discount_percentage < 0.5 THEN '40-50%'
           WHEN discount_percentage >= 0.5 AND discount_percentage < 0.6 THEN '50-60%'
           WHEN discount_percentage >= 0.6 AND discount_percentage < 0.7 THEN '60-70%'
           WHEN discount_percentage >= 0.7 AND discount_percentage < 0.8 THEN '70-80%'
           WHEN discount_percentage >= 0.8 AND discount_percentage < 0.9 THEN '80-90%'
           WHEN discount_percentage >= 0.9 THEN '90-100%'
         END AS bucket,
         COUNT(*) AS count
       FROM products
       GROUP BY bucket
       ORDER BY bucket`
    );
    res.json(result.rows.filter((r) => r.bucket !== null));
  } catch (err) {
    next(err);
  }
};

export const getCategoryAvgRating = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await pool.query(
      `SELECT SPLIT_PART(category, '|', 1) AS category,
              ROUND(AVG(rating)::numeric, 2) AS avg_rating
       FROM products
       WHERE category IS NOT NULL AND category != '' AND rating > 0
       GROUP BY SPLIT_PART(category, '|', 1)
       ORDER BY avg_rating DESC`
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};
