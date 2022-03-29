import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { modalStyle } from "./modalStyle";

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
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {headerText}
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {contentText}
          </Typography>
          <Box sx={{ mt: 2 }} textAlign="center">
            <Button
              variant="contained"
              size="medium"
              onClick={leftButtonOnClick}
            >
              {leftButtonText}
            </Button>
          </Box>
          <Box sx={{ mt: 2 }} textAlign="center">
            <Button
              variant="contained"
              size="medium"
              onClick={rightButtonOnClick}
            >
              {rightButtonText}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
