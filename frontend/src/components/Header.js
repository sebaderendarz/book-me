import { Fragment } from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  let { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

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
                localStorage.setItem("previousLocation", location.pathname);
                navigate("/signin");
              }}
            >
              Sign in
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                localStorage.setItem("previousLocation", location.pathname);
                navigate("/signup");
              }}
            >
              Sign up
            </Button>
          </Stack>
        ) : (
          <Stack direction="row" spacing={1}>
            <Button variant="contained" size="medium" onClick={logoutUser}>
              Logout
            </Button>{" "}
          </Stack>
        )}
      </Toolbar>
    </Fragment>
  );
}

export default Header;
