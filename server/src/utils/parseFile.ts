import * as XLSX from "xlsx";

export interface ProductRow {
  product_id: string;
  product_name: string;
  category: string;
  discounted_price: number;
  actual_price: number;
  discount_percentage: number;
  rating: number;
  rating_count: number;
  about_product: string;
  user_name: string;
  review_title: string;
  review_content: string;
}

function cleanPrice(value: unknown): number {
  if (value == null) return 0;
  const str = String(value).replace(/[₹,$€£\s,]/g, "");
  const num = parseFloat(str);
  return isNaN(num) ? 0 : num;
}

function cleanNumber(value: unknown): number {
  if (value == null) return 0;
  const str = String(value).replace(/,/g, "");
  const num = parseFloat(str);
  return isNaN(num) ? 0 : num;
}

export function parseFile(filePath: string): ProductRow[] {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rawData = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

  return rawData.map((row) => ({
    product_id: String(row["product_id"] ?? ""),
    product_name: String(row["product_name"] ?? ""),
    category: String(row["category"] ?? ""),
    discounted_price: cleanPrice(row["discounted_price"]),
    actual_price: cleanPrice(row["actual_price"]),
    discount_percentage: cleanNumber(row["discount_percentage"]),
    rating: cleanNumber(row["rating"]),
    rating_count: cleanNumber(row["rating_count"]),
    about_product: String(row["about_product"] ?? ""),
    user_name: String(row["user_name"] ?? ""),
    review_title: String(row["review_title"] ?? ""),
    review_content: String(row["review_content"] ?? ""),
  }));
}
