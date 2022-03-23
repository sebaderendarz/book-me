import { Fragment } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const { accountType } = props;
  let { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Fragment>
      <Toolbar
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 2 }}
      >
        <Avatar
          alt="BookMe Logo"
          src="/media/bookme_200.png"
          onClick={() => navigate("/")}
        />
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        ></Typography>
        {!user ? (
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                if (accountType === "BARBER") {
                  window.location.replace(
                    "http://localhost:8000/admin/",
                    "_blank"
                  );
                } else {
                  navigate("/customer/signin");
                }
              }}
            >
              Sign in
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                navigate(
                  accountType === "CUSTOMER"
                    ? "/customer/signup"
                    : "/hairdresser/signup"
                );
              }}
            >
              Sign up
            </Button>
          </Stack>
        ) : (
          <Stack direction="row" spacing={1}>
            <Button variant="contained" size="medium" onClick={logoutUser}>
              Logout
            </Button>
          </Stack>
        )}
      </Toolbar>
    </Fragment>
  );
}

export default Header;
