import { Request, Response, NextFunction } from "express";
import pool from "../db";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));
    const offset = (page - 1) * limit;
    const search = (req.query.search as string) || "";
    const category = (req.query.category as string) || "";

    const conditions: string[] = [];
    const params: unknown[] = [];
    let paramIdx = 1;

    if (search) {
      conditions.push(`product_name ILIKE $${paramIdx}`);
      params.push(`%${search}%`);
      paramIdx++;
    }

    if (category) {
      conditions.push(`SPLIT_PART(category, '|', 1) = $${paramIdx}`);
      params.push(category);
      paramIdx++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM products ${whereClause}`,
      params
    );
    const total = parseInt(countResult.rows[0].count);

    const dataResult = await pool.query(
      `SELECT id, product_id, product_name, category, discounted_price, actual_price,
              discount_percentage, rating, rating_count, about_product, user_name,
              review_title, review_content
       FROM products ${whereClause}
       ORDER BY id
       LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`,
      [...params, limit, offset]
    );

    res.json({
      products: dataResult.rows,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};

export const getCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await pool.query(
      `SELECT DISTINCT SPLIT_PART(category, '|', 1) AS category
       FROM products
       WHERE category IS NOT NULL AND category != ''
       ORDER BY category`
    );
    res.json(result.rows.map((r) => r.category));
  } catch (err) {
    next(err);
  }
};
