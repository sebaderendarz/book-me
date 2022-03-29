import { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Box from "@mui/material/Box";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Grid from "@mui/material/Grid";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import BookOrCancelBarberTimeItem from "./BookOrCancelBarberTimeItem";

export default function BarberAvailability(props) {
  const { absences, orders } = props;
  const [date, setDate] = useState(new Date());
  return (
    <Box
      sx={{
        px: 2,
        py: 4,
        mt: 5,
        mb: 1,
        borderRadius: 1,
        boxShadow: "0px 1px 3px 0px rgb(0 0 0 / 20%)",
      }}
    >
      <Grid container align="center" sx={{ mb: 3 }}>
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
        <BookOrCancelBarberTimeItem
          isAvail={true}
          dateTime={"11:00"}
          offerId={1}
        />
        <BookOrCancelBarberTimeItem
          isAvail={false}
          dateTime={"11:30"}
          offerId={2}
        />
        <BookOrCancelBarberTimeItem
          isAvail={false}
          dateTime={"12:00"}
          offerId={3}
        />
        <BookOrCancelBarberTimeItem
          isAvail={true}
          dateTime={"12:30"}
          offerId={4}
        />
      </Grid>
    </Box>
  );
}
