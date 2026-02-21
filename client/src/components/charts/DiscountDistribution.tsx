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
import { useGetDiscountDistributionQuery } from "../../app/api";

export default function DiscountDistribution() {
  const { data, isLoading } = useGetDiscountDistributionQuery();

  return (
    <Paper sx={{ p: 2, height: "100%" }}>
      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
        Discount Distribution
      </Typography>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data?.map((d) => ({ ...d, count: Number(d.count) }))}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bucket" fontSize={12} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#ff9800" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
}
