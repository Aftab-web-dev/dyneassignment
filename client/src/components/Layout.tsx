import { useLocation, useNavigate, Outlet } from "react-router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const routes = ["/", "/dashboard"];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = routes.indexOf(location.pathname);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ mr: 4 }}>
            Product Analytics
          </Typography>
          <Tabs
            value={currentTab === -1 ? 0 : currentTab}
            onChange={(_, newValue) => navigate(routes[newValue])}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="Products" />
            <Tab label="Dashboard" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 3, mb: 3, flex: 1 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
