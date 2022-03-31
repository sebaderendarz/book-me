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
import useAxios from "../utils/useAxios";

// failed cancellation, do you want to book service, redirect to login-> some text, maybe response from BE, 2 buttons, TRY AGAIN and CLOSE
// final word booked -> Modal with a beautiful, big token to be copied and some additional text.
//                      Token in blue. Text above should be black. One OK button below.
// NOTE: when string is empty or missing Typography component is not rendered at all. Both modal types can by implemented in one :)
// final word cancel, failed booking-> some text, one OK button

// cancel service -> some text, input field to put token and two buttons below, BACK and CANCEL/CONFIRM

// IDEA: there should be an object storing the current texts, button texts and click/close handlers for modal.
// This object should be updated whenever needed.

// Datetime sent to BE should be in UTC.  or maybe without TZ at all?

// DONE:
// 1. Redirect to login and back after login flow works fine.

const isAlnumValidator = (val) => {
  if (val.match(/^[a-z0-9]+$/i)) {
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
  const [generalModalProps, setGeneralModalProps] = useState(null);
  const [finalWordsModalOpen, setFinalWordsModalOpen] = useState(false);
  const [finalWordsModalProps, setFinalWordsModalProps] = useState(null);
  const [inputModalOpen, setInputModalOpen] = useState(false);
  const [inputModalProps, setInputModalProps] = useState(null);
  const api = useAxios();
  const location = useLocation();
  const navigate = useNavigate();

  const bookServiceHandler = ({ offerId, dateTime }) => {
    console.log(`book service button clicked: ${offerId} ${dateTime}`);
    if (!user) {
      setGeneralModalProps(redirectToLoginModalProps);
    } else {
      setGeneralModalProps(doYouWantToBookModalProps);
    }
    setGeneralModalOpen(true);
  };

  const cancelServiceHandler = ({ offerId, dateTime }) => {
    if (!user) {
      setGeneralModalProps(redirectToLoginModalProps);
      setGeneralModalOpen(true);
    } else {
      setInputModalProps(cancelServiceModalProps);
      setInputModalOpen(true);
    }
  };

  const cancelServiceModalProps = {
    contentText: "Enter token to cancel your reservation.",
    handleModalClose: () => setInputModalOpen(false),
    headerText: null,
    inputValidators: [lengthValidator, isAlnumValidator],
    leftButtonOnClick: () => {
      setInputModalOpen(false);
    },
    leftButtonText: "BACK",
    rightButtonOnClick: (token) => {
      api
        .delete("/customer/service_order/", { data: { token } })
        .then(() => {
          setFinalWordsModalProps(finalWordsCancelledModalProps);
          setInputModalOpen(false);
          setFinalWordsModalOpen(true);
        })
        .catch((error) => {
          let failedModalProps = failedCancellationModalProps;
          if (error.response && error.response.data) {
            if (error.response.data.token) {
              failedModalProps = {
                contentText: error.response.data.token[0],
                ...failedModalProps,
              };
            }
            if (error.response.data.non_field_errors) {
              failedModalProps = {
                ...failedModalProps,
                contentText: error.response.data.non_field_errors[0],
              };
            }
          }
          setGeneralModalProps(failedModalProps);
          setInputModalOpen(false);
          setGeneralModalOpen(true);
        });
    },
    rightButtonText: "CONFIRM",
  };

  const doYouWantToBookModalProps = {
    contentText: "Do you want wan to book hairdresser's service?",
    handleModalClose: () => setGeneralModalOpen(false),
    headerText: null,
    leftButtonOnClick: () => setGeneralModalOpen(false),
    leftButtonText: "BACK",
    rightButtonOnClick: ({ offerId, dateTime }) => {
      console.log(`BOOK service should be invoked -> ${offerId} ${dateTime}`);
      // send a request to book service here
      // success of fail final words message based on the response,
      // try to take message from response
      //setFinalWordsModalProps(failedBookingModalProps);
      setFinalWordsModalProps(finalWordsBookedModalProps);

      setGeneralModalOpen(false);
      setFinalWordsModalOpen(true);
    },
    rightButtonText: "BOOK",
  };

  const failedBookingModalProps = {
    buttonText: "OK",
    contentText: "Booking hairdresser's service failed.",
    handleModalClose: () => setFinalWordsModalOpen(false),
    headerText: null,
    highlightedText: null,
  };

  const failedCancellationModalProps = {
    contentText: "Hairdresser's service cancellation failed.",
    handleModalClose: () => setGeneralModalOpen(false),
    headerText: null,
    leftButtonOnClick: () => setGeneralModalOpen(false),
    leftButtonText: "CLOSE",
    rightButtonOnClick: () => {
      setGeneralModalOpen(false);
      setInputModalOpen(true);
    },
    rightButtonText: "TRY AGAIN",
  };

  const finalWordsBookedModalProps = {
    buttonText: "OK",
    contentText: "Successfully booked hairdresser's service.",
    handleModalClose: () => setFinalWordsModalOpen(false),
    headerText: null,
    highlightedText: "TOKEN HERE - SD1Q34RD",
  };

  const finalWordsCancelledModalProps = {
    buttonText: "OK",
    contentText: "Successfully cancelled hairdresser's service.",
    handleModalClose: () => setFinalWordsModalOpen(false),
    headerText: null,
    highlightedText: null,
  };

  const redirectToLoginModalProps = {
    contentText:
      "Only signed in users can book and cancel hairdresser's services. Please sign in first.",
    handleModalClose: () => setGeneralModalOpen(false),
    headerText: null,
    leftButtonOnClick: () => setGeneralModalOpen(false),
    leftButtonText: "BACK",
    rightButtonOnClick: () => {
      localStorage.setItem("previousLocation", location.pathname);
      navigate("/customer/signin");
    },
    rightButtonText: "SIGN IN",
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
        open={finalWordsModalOpen}
        {...finalWordsModalProps}
      />
      <HeaderTextInputTwoButtonsModal
        open={inputModalOpen}
        {...inputModalProps}
      />
      <HeaderTextTwoButtonsModal
        open={generalModalOpen}
        {...generalModalProps}
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
