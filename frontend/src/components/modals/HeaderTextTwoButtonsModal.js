import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { modalStyle } from "./modalStyle";

export default function HeaderTextTwoButtonsModal(props) {
  const {
    contentText,
    handleModalClose,
    headerText,
    leftButtonOnClick,
    leftButtonText,
    modalOpen,
    rightButtonOnClick,
    rightButtonText,
  } = props;
  return (
    <Modal
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      aria-describedby="transition-modal-description"
      aria-labelledby="transition-modal-title"
      closeAfterTransition
      onClose={handleModalClose}
      open={modalOpen}
    >
      <Fade in={modalOpen}>
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
            <Grid item xs={6}>
              <Button
                onClick={leftButtonOnClick}
                size="medium"
                variant="contained"
              >
                {leftButtonText}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={rightButtonOnClick}
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
