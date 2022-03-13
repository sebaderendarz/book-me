import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function Header() {
  return (
    <React.Fragment>
      <Toolbar
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 2 }}
      >
        <Avatar alt="BookMe Logo" src="/media/bookme_124x124.png" />{" "}
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        ></Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" size="medium">
            Login
          </Button>
          <Button variant="outlined" size="medium">
            Sign up
          </Button>
        </Stack>
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
