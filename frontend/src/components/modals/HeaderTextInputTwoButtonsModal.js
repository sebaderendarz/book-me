import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { modalStyle } from "./modalStyle";

export default function HeaderTextInputTwoButtonsModal(props) {
  const {
    contentText,
    handleModalClose,
    headerText,
    inputValidators,
    leftButtonOnClick,
    leftButtonText,
    open,
    rightButtonOnClick,
    rightButtonText,
  } = props;
  const [input, setInput] = useState("");
  const [inputHelperText, setInputHelperText] = useState("");
  const [isInputError, setIsInputError] = useState(false);

  const handleModalOnClose = () => {
    setInput("");
    setIsInputError(false);
    setInputHelperText("");
    handleModalClose();
  };

  const handleLeftButtonOnClick = () => {
    setInput("");
    setIsInputError(false);
    setInputHelperText("");
    leftButtonOnClick();
  };

  const handleRightButtonOnClick = () => {
    let inputErrorMessage = "";
    if (inputValidators && inputValidators.length > 0) {
      inputValidators.forEach((func) => {
        if (inputErrorMessage.length === 0) {
          inputErrorMessage = func(input);
        }
      });
    }
    if (inputErrorMessage.length === 0) {
      setIsInputError(false);
      setInputHelperText("");
      rightButtonOnClick(input);
    } else {
      setIsInputError(true);
      setInputHelperText(inputErrorMessage);
    }
  };

  return (
    <Modal
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      aria-describedby="transition-modal-description"
      aria-labelledby="transition-modal-title"
      closeAfterTransition
      onClose={handleModalOnClose}
      open={open}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Typography
            align="center"
            component="h2"
            id="transition-modal-title"
            variant="h6"
          >
            {headerText}
          </Typography>
          <Typography
            align="center"
            id="transition-modal-description"
            sx={{ mt: 2 }}
          >
            {contentText}
          </Typography>
          <Grid container sx={{ mt: 3, textAlign: "center" }}>
            <Grid item xs={12} sx={{ mb: 3.5 }}>
              <TextField
                label="token"
                error={isInputError}
                helperText={inputHelperText}
                variant="outlined"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={handleLeftButtonOnClick}
                size="medium"
                variant="contained"
              >
                {leftButtonText}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={handleRightButtonOnClick}
                size="medium"
                variant="contained"
              >
                {rightButtonText}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
}
