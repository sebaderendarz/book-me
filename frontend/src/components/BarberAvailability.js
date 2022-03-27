import { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Box from "@mui/material/Box";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Grid from "@mui/material/Grid";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Paper from "@mui/material/Paper";

const style = {
  width: "100%",
};

export default function BarberAvailability(props) {
  const { absences, orders } = props;
  const [date, setDate] = useState(new Date());
  return (
    <Box
      sx={{
        p: 2,
        mt: 5,
        mb: 2,
        borderRadius: 1,
        boxShadow: "0px 1px 3px 0px rgb(0 0 0 / 20%)",
      }}
    >
      <Grid container align="center">
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="service date"
              value={date}
              minDate={new Date()}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Grid container columnSpacing={4} rowSpacing={2} justifyContent="center">
        <Grid item xs={11} sm={5} container>
          <Paper style={style}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography variant="subtitle1" component="div">
                  11:30
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" component="div">
                  {"$"}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={11} sm={5} container>
          another{" "}
        </Grid>
      </Grid>
    </Box>
  );
}
