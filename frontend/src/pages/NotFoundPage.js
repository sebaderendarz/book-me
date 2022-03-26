import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Footer from "../components/Footer";
import BlueUnderlinedTextTypography from "../components/BlueUnderlinedTextTypography";

const theme = createTheme();

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "white",
        }}
      >
        <CssBaseline />
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Sorry, but the page you are looking for does not exist, has been
            removed, name changed or is temporarily unavailable.
          </Typography>
          <BlueUnderlinedTextTypography
            variant="body1"
            onClick={() => navigate("/")}
          >
            Back to home
          </BlueUnderlinedTextTypography>
          <Footer />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
