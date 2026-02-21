import pool from "../db";

export const initializeDatabase = async (): Promise<void> => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        product_id VARCHAR(255),
        product_name TEXT,
        category TEXT,
        discounted_price NUMERIC(10, 2),
        actual_price NUMERIC(10, 2),
        discount_percentage NUMERIC(5, 2),
        rating NUMERIC(3, 1),
        rating_count INTEGER,
        about_product TEXT,
        user_name TEXT,
        review_title TEXT,
        review_content TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);
      CREATE INDEX IF NOT EXISTS idx_products_rating ON products (rating);
      CREATE INDEX IF NOT EXISTS idx_products_product_name ON products USING gin (to_tsvector('english', product_name));
    `);
    console.log("Database tables initialized");
  } finally {
    client.release();
  }
};
