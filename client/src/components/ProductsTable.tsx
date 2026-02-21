import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { useGetProductsQuery, useGetCategoriesQuery } from "../app/api";

export default function ProductsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset page when filters change
  useEffect(() => {
    setPage(0);
  }, [debouncedSearch, category]);

  const { data, isLoading, isError, error } = useGetProductsQuery({
    page: page + 1,
    limit: rowsPerPage,
    search: debouncedSearch,
    category,
  });

  const { data: categories } = useGetCategoriesQuery();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Products
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Search by product name"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 300 }}
        />
        <TextField
          select
          label="Category"
          variant="outlined"
          size="small"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories?.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {isError && (
        <Alert severity="error">
          {(error as { data?: { error?: string } })?.data?.error ??
            "Failed to load products"}
        </Alert>
      )}

      {data && (
        <Paper>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Discounted</TableCell>
                  <TableCell align="right">Discount %</TableCell>
                  <TableCell align="right">Rating</TableCell>
                  <TableCell align="right">Reviews</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.products.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell
                      sx={{
                        maxWidth: 300,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {product.product_name}
                    </TableCell>
                    <TableCell>
                      {product.category.split("|")[0]}
                    </TableCell>
                    <TableCell align="right">
                      {Number(product.actual_price).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </TableCell>
                    <TableCell align="right">
                      {Number(product.discounted_price).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </TableCell>
                    <TableCell align="right">
                      {(Number(product.discount_percentage) * 100).toFixed(0)}%
                    </TableCell>
                    <TableCell align="right">{product.rating}</TableCell>
                    <TableCell align="right">
                      {Number(product.rating_count).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={data.total}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </Paper>
      )}
    </Box>
  );
}
