import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { modalStyle } from "./modalStyle";

export default function HeaderTextOneButtonModal(props) {
  const {
    buttonText,
    contentText,
    handleModalClose,
    headerText,
    highlightedText,
    open,
  } = props;
  return (
    <Modal
      aria-describedby="transition-modal-description"
      aria-labelledby="transition-modal-title"
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      closeAfterTransition
      onClose={handleModalClose}
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
          <Typography
            align="center"
            sx={{ mt: 3, color: "#1976d2" }}
            variant="h4"
          >
            {highlightedText}
          </Typography>
          <Box sx={{ mt: 3 }} textAlign="center">
            <Button
              onClick={handleModalClose}
              size="medium"
              variant="contained"
            >
              {buttonText}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
