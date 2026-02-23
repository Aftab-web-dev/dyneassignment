# Dyne Assignment

A full-stack web application for uploading, managing, and analyzing product data with e-commerce analytics.

## Tech Stack

**Frontend:** React 19, TypeScript, Vite, Redux Toolkit (RTK Query), Material-UI, Recharts, React Router

**Backend:** Node.js, Express 5, TypeScript, PostgreSQL, Multer, XLSX

**Deployment:** Vercel (client as SPA, server as serverless functions)

## Features

- **File Upload** - Import product data from CSV/XLSX/XLS files (up to 10MB), with automatic data cleaning and bulk insertion
- **Product Management** - Paginated product listing with search by name and filter by category
- **Analytics Dashboard**
  - Products per category (bar chart)
  - Top 10 reviewed products
  - Discount distribution across percentage buckets
  - Average rating by category

## Project Structure

```
assigments/
├── client/                 # React frontend
│   ├── src/
│   │   ├── app/            # Redux store & RTK Query API
│   │   ├── pages/          # UploadPage, DashboardPage
│   │   ├── components/     # Layout, FileUpload, ProductsTable
│   │   └── components/charts/  # Analytics chart components
│   └── vite.config.ts
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/    # upload, product, analytics controllers
│   │   ├── routes/         # API route definitions
│   │   ├── middleware/     # Error handling
│   │   └── utils/          # DB init, file parsing
│   └── .env
│
└── package.json            # Root workspace config (pnpm)
```

## Getting Started

### Prerequisites

- Node.js
- pnpm
- PostgreSQL database

### Installation

```bash
# Install all dependencies
pnpm install
```

### Environment Variables

Create a `server/.env` file:

```env
DATABASE_URL=your_postgresql_connection_string
PORT=3000
NODE_ENV=development
```

### Running

```bash
# Run both client and server concurrently
pnpm dev

# Or run individually
pnpm client    # Vite dev server on localhost:5173
pnpm server    # Express server on localhost:3000
```

### Building for Production

```bash
cd client && pnpm build
cd server && pnpm build && pnpm start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | Upload and import a CSV/XLSX file |
| GET | `/api/products` | Get products (supports `page`, `limit`, `search`, `category` query params) |
| GET | `/api/products/categories` | Get all distinct categories |
| GET | `/api/analytics/products-per-category` | Product count per category |
| GET | `/api/analytics/top-reviewed` | Top 10 most reviewed products |
| GET | `/api/analytics/discount-distribution` | Products grouped by discount range |
| GET | `/api/analytics/category-avg-rating` | Average rating per category |
