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
import { useGetCategoryAvgRatingQuery } from "../../app/api";

export default function CategoryAvgRating() {
  const { data, isLoading } = useGetCategoryAvgRatingQuery();

  return (
    <Paper sx={{ p: 2, height: "100%" }}>
      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
        Average Rating by Category
      </Typography>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data?.map((d) => ({
              ...d,
              avg_rating: Number(d.avg_rating),
            }))}
            margin={{ top: 5, right: 20, left: 0, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="category"
              angle={-45}
              textAnchor="end"
              interval={0}
              fontSize={11}
            />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Bar dataKey="avg_rating" fill="#4caf50" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
}
