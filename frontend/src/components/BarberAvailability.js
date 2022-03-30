import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Box from "@mui/material/Box";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Grid from "@mui/material/Grid";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import BookOrCancelBarberServiceItem from "./BookOrCancelBarberServiceItem";
import AuthContext from "../context/AuthContext";
import HeaderTextTwoButtonsModal from "./modals/HeaderTextTwoButtonsModal";
import HeaderTextOneButtonModal from "./modals/HeaderTextOneButtonModal";

// IDEA: one modal per modal type.

// failed cancellation, do you want to book service, redirect to login-> some text, maybe response from BE, 2 buttons, TRY AGAIN and CLOSE
// cancel service -> some text, input field to put token and two buttons below, BACK and CANCEL/CONFIRM
// final word cancel and failed booking-> prepared, some text, one OK button
// final word booked -> Modal with a beautiful, big token to be copied and some additional text.
//                      Token in blue. Text above should be black. One OK button below.

export default function BarberAvailability(props) {
  const { absences, orders } = props;
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [finalWordsModalOpen, setFinalWordsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const bookServiceHandler = ({ offerId, dateTime }) => {
    if (!user) {
      setLoginModalOpen(true);
    } else {
      console.log(`book service handler called: ${offerId} ${dateTime}`);
    }
  };

  const cancelServiceHandler = ({ offerId, dateTime }) => {
    if (!user) {
      setLoginModalOpen(true);
    } else {
      console.log(`cancel service handler called: ${offerId} ${dateTime}`);
    }
  };

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
      <HeaderTextOneButtonModal
        contentText={
          "Successfully canceled hairdresser's service. Text should be taken from response from BE"
        }
        handleModalClose={() => setFinalWordsModalOpen(false)}
        buttonOnClick={() => setFinalWordsModalOpen(false)}
        buttonText={"OK"}
        modalOpen={finalWordsModalOpen}
      />
      <HeaderTextTwoButtonsModal
        contentText={
          "Only signed in users can book and cancel hairdresser's services. Please sign in first."
        }
        handleModalClose={() => setLoginModalOpen(false)}
        leftButtonOnClick={() => setLoginModalOpen(false)}
        leftButtonText={"BACK"}
        modalOpen={loginModalOpen}
        rightButtonOnClick={() => {
          localStorage.setItem("previousLocation", location.pathname);
          navigate("/customer/signin");
        }}
        rightButtonText={"SIGN IN"}
      />
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
        <BookOrCancelBarberServiceItem
          bookServiceHandler={bookServiceHandler}
          cancelServiceHandler={cancelServiceHandler}
          dateTime={"11:00"}
          isAvail={true}
          offerId={1}
        />
        <BookOrCancelBarberServiceItem
          bookServiceHandler={bookServiceHandler}
          cancelServiceHandler={cancelServiceHandler}
          isAvail={false}
          dateTime={"11:30"}
          offerId={2}
        />
        <BookOrCancelBarberServiceItem
          bookServiceHandler={bookServiceHandler}
          cancelServiceHandler={cancelServiceHandler}
          isAvail={false}
          dateTime={"12:00"}
          offerId={3}
        />
        <BookOrCancelBarberServiceItem
          bookServiceHandler={bookServiceHandler}
          cancelServiceHandler={cancelServiceHandler}
          isAvail={true}
          dateTime={"12:30"}
          offerId={4}
        />
      </Grid>
    </Box>
  );
}
