import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Box from "@mui/material/Box";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Grid from "@mui/material/Grid";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import BookOrCancelBarberServiceItem from "./BookOrCancelBarberServiceItem";
import HeaderTextInputTwoButtonsModal from "./modals/HeaderTextInputTwoButtonsModal";
import HeaderTextOneButtonModal from "./modals/HeaderTextOneButtonModal";
import HeaderTextTwoButtonsModal from "./modals/HeaderTextTwoButtonsModal";
import AuthContext from "../context/AuthContext";

// failed cancellation, do you want to book service, redirect to login-> some text, maybe response from BE, 2 buttons, TRY AGAIN and CLOSE
// final word booked -> Modal with a beautiful, big token to be copied and some additional text.
//                      Token in blue. Text above should be black. One OK button below.
// NOTE: when string is empty or missing Typography component is not rendered at all. Both modal types can by implemented in one :)

// final word cancel, failed booking-> some text, one OK button

// cancel service -> some text, input field to put token and two buttons below, BACK and CANCEL/CONFIRM

// IDEA: there should be an object storing the current texts, button texts and click/close handlers for modal.
// This object should be updated whenever needed.

// Datetime sent to BE should be in UTC.  or maybe without TZ at all?

const isAlnumValidator = (val) => {
  if (val.match("/^[a-z0-9]+$/i") === null) {
    return "";
  }
  return "Token should be alphanumeric.";
};

const lengthValidator = (val) => {
  if (val.length === 8) {
    return "";
  }
  return "Token should be 8 length.";
};

export default function BarberAvailability(props) {
  const { absences, orders } = props;
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [generalModalOpen, setGeneralModalOpen] = useState(false);
  const [finalWordsModalOpen, setFinalWordsModalOpen] = useState(false);
  const [inputModalOpen, setInputModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const bookServiceHandler = ({ offerId, dateTime }) => {
    if (!user) {
      // set props for generalModal that it should look like login modal
      setGeneralModalOpen(true);
    } else {
      // send request to BE. Display correct modal based on the response.
      console.log(`book service handler called: ${offerId} ${dateTime}`);
    }
  };

  const cancelServiceHandler = ({ offerId, dateTime }) => {
    if (!user) {
      // set props for generalModal that it should look like login modal
      setGeneralModalOpen(true);
    } else {
      // send request to BE. Display correct modal based on the response.
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
        highlightedText={"XSD2S3MI"}
        buttonOnClick={() => setFinalWordsModalOpen(false)}
        buttonText={"OK"}
        modalOpen={finalWordsModalOpen}
      />
      <HeaderTextInputTwoButtonsModal
        contentText={"Enter token to cancel your reservation."}
        modalOnClose={() => setInputModalOpen(false)}
        inputValidators={[lengthValidator, isAlnumValidator]}
        leftButtonOnClick={() => setInputModalOpen(false)}
        leftButtonText={"BACK"}
        modalOpen={inputModalOpen}
        rightButtonOnClick={(input) => {
          console.log(`token from input: ${input}`);
        }}
        rightButtonText={"CONFIRM"}
      />
      <HeaderTextTwoButtonsModal
        contentText={
          "Only signed in users can book and cancel hairdresser's services. Please sign in first."
        }
        handleModalClose={() => setGeneralModalOpen(false)}
        leftButtonOnClick={() => setGeneralModalOpen(false)}
        leftButtonText={"BACK"}
        modalOpen={generalModalOpen}
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
