import { Router } from "express";
import {
  getProductsPerCategory,
  getTopReviewed,
  getDiscountDistribution,
  getCategoryAvgRating,
} from "../controllers/analyticsController";

const router = Router();

router.get("/products-per-category", getProductsPerCategory);
router.get("/top-reviewed", getTopReviewed);
router.get("/discount-distribution", getDiscountDistribution);
router.get("/category-avg-rating", getCategoryAvgRating);

export default router;
