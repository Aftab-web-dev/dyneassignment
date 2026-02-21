import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ProductsPerCategory from "../components/charts/ProductsPerCategory";
import TopReviewed from "../components/charts/TopReviewed";
import DiscountDistribution from "../components/charts/DiscountDistribution";
import CategoryAvgRating from "../components/charts/CategoryAvgRating";

export default function DashboardPage() {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Analytics Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ProductsPerCategory />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TopReviewed />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <DiscountDistribution />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CategoryAvgRating />
        </Grid>
      </Grid>
    </>
  );
}
