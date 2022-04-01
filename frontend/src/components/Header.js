import { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AuthContext from "../context/AuthContext";

// TODO Improve redirection when hairdresser clicks on back arrow in the browser
// when being in the django admin login view. Now it sometimes redirects to "/customer"
// or "/hairdresser/signup", but I'm not sure if hairdresser should be redirected to signup
// page again.

function Header(props) {
  const { accountType } = props;
  let { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Fragment>
      <Toolbar
        sx={{ borderBottom: 1.2, borderColor: "divider", marginBottom: 2 }}
      >
        <Avatar
          alt="BookMe Logo"
          src="/media/bookme_200.png"
          onClick={() =>
            // NOTE: For customers navigate to "/" instead of "/customer", because it clears
            // search results and redirects to the rerendered "/customer" displaying app description.
            navigate(accountType === "CUSTOMER" ? "/" : "/hairdresser")
          }
        />
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1, color: "#1976d2" }}
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
