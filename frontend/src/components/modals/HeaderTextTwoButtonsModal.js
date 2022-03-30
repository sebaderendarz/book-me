import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { modalStyle } from "./modalStyle";
import Grid from "@mui/material/Grid";

export default function HeaderTextTwoButtonsModal(props) {
  const {
    leftButtonText,
    rightButtonText,
    leftButtonOnClick,
    rightButtonOnClick,
    contentText,
    handleModalClose,
    headerText,
    modalOpen,
  } = props;
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={modalOpen}
      onClose={handleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalOpen}>
        <Box sx={modalStyle}>
          <Typography
            id="transition-modal-title"
            align="center"
            variant="h6"
            component="h2"
          >
            {headerText}
          </Typography>
          <Typography
            id="transition-modal-description"
            align="center"
            sx={{ mt: 2 }}
          >
            {contentText}
          </Typography>
          <Grid container sx={{ mt: 3, textAlign: "center" }}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                size="medium"
                onClick={leftButtonOnClick}
              >
                {leftButtonText}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                size="medium"
                onClick={rightButtonOnClick}
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
