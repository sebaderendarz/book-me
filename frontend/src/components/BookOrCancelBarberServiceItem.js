import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const theme = createTheme({
  palette: {
    available: {
      main: "#1976d2",
      contrastText: "#fff",
    },
    busy: {
      main: "#d4d4d4",
      contrastText: "#fff",
    },
  },
});

export default function BookOrCancelBarberServiceItem(props) {
  const {
    bookServiceHandler,
    cancelServiceHandler,
    dateTime,
    isAvail,
    offerId,
  } = props;

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={11} sm={5} container>
        <Paper style={{ width: "100%" }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box sx={{ m: 1, textAlign: "center" }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: isAvail
                      ? theme.palette.available.main
                      : theme.palette.busy.main,
                  }}
                >
                  {dateTime}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "center" }}>
              <Button
                color={isAvail ? "available" : "busy"}
                component="div"
                onClick={() => {
                  if (isAvail) {
                    bookServiceHandler({ offerId, dateTime });
                  } else {
                    cancelServiceHandler({ offerId, dateTime });
                  }
                }}
                size="medium"
                variant="contained"
                sx={{ m: 1.3, minWidth: 87 }}
              >
                {isAvail ? "Book" : "Cancel"}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
}
