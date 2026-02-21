import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  PaginatedProducts,
  CategoryCount,
  TopReviewedProduct,
  DiscountBucket,
  CategoryAvgRating,
  UploadResponse,
} from "../types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Products", "Analytics"],
  endpoints: (builder) => ({
    uploadFile: builder.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products", "Analytics"],
    }),

    getProducts: builder.query<
      PaginatedProducts,
      { page?: number; limit?: number; search?: string; category?: string }
    >({
      query: ({ page = 1, limit = 10, search = "", category = "" }) => ({
        url: "/products",
        params: { page, limit, search, category },
      }),
      providesTags: ["Products"],
    }),

    getCategories: builder.query<string[], void>({
      query: () => "/products/categories",
      providesTags: ["Products"],
    }),

    getProductsPerCategory: builder.query<CategoryCount[], void>({
      query: () => "/analytics/products-per-category",
      providesTags: ["Analytics"],
    }),

    getTopReviewed: builder.query<TopReviewedProduct[], void>({
      query: () => "/analytics/top-reviewed",
      providesTags: ["Analytics"],
    }),

    getDiscountDistribution: builder.query<DiscountBucket[], void>({
      query: () => "/analytics/discount-distribution",
      providesTags: ["Analytics"],
    }),

    getCategoryAvgRating: builder.query<CategoryAvgRating[], void>({
      query: () => "/analytics/category-avg-rating",
      providesTags: ["Analytics"],
    }),
  }),
});

export const {
  useUploadFileMutation,
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductsPerCategoryQuery,
  useGetTopReviewedQuery,
  useGetDiscountDistributionQuery,
  useGetCategoryAvgRatingQuery,
} = api;
