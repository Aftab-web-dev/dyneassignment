import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetTopReviewedQuery } from "../../app/api";

export default function TopReviewed() {
  const { data, isLoading } = useGetTopReviewedQuery();

  const chartData = data?.map((d) => ({
    name: d.product_name.length > 30 ? d.product_name.slice(0, 30) + "..." : d.product_name,
    rating_count: Number(d.rating_count),
  }));

  return (
    <Paper sx={{ p: 2, height: "100%" }}>
      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
        Top 10 Most Reviewed Products
      </Typography>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 120, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={110} fontSize={11} />
            <Tooltip />
            <Bar dataKey="rating_count" fill="#dc004e" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
}
