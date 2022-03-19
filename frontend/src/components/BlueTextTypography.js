import Typography from "@mui/material/Typography";

import { withStyles } from "@mui/styles";

const BlueTextTypography = withStyles({
  root: {
    color: "#1976d2",
    textDecoration: "underline",
  },
})(Typography);

export default BlueTextTypography;
