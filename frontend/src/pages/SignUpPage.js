import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import BlueUnderlinedTextTypography from "../components/BlueUnderlinedTextTypography";
import Footer from "../components/Footer";

const theme = createTheme();

const defaultFormErrors = {
  firstName: { error: false, errorMessage: "" },
  lastName: { error: false, errorMessage: "" },
  email: { error: false, errorMessage: "" },
  password: { error: false, errorMessage: "" },
  general: { error: false, errorMessage: "" },
};

export default function SignUpPage() {
  let { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [formErrors, setFormErrors] = useState(defaultFormErrors);

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = validateForm();
    if (errors !== defaultFormErrors) {
      setFormErrors(errors);
    } else {
      const data = new FormData(event.currentTarget);
      // TODO register user here
      // add registerUser method to auth context.
      console.log({
        email: data.get("email"),
        password: data.get("password"),
      });

      // TODO display a modal that registration succeded and redirect user to some page, previous?
    }
  };

  const validateForm = () => {
    if (!form) {
      return {
        general: { error: true, errorMessage: "Please fill out this form." },
      };
    }

    const formLength = form.length;
    const errors = { general: { error: false, errorMessage: "" } };
    if (form.checkValidity() === false) {
      for (let i = 0; i < formLength; i++) {
        const elem = form[i];
        if (Object.keys(formErrors).includes(elem.name)) {
          if (!elem.validity.valid) {
            errors[elem.name] = {
              error: true,
              errorMessage: elem.validationMessage,
            };
          } else {
            errors[elem.name] = {
              error: false,
              errorMessage: "",
            };
          }
        }
      }
      return { ...formErrors, ...errors };
    } else {
      return defaultFormErrors;
    }
  };

  const getGeneralError = (response) => {
    // TODO adjust this, check what is returned from BE
    let errorMessage = "Some cool error message when registration failed.";
    if (response && response.detail) errorMessage = response.detail;
    return { general: { error: true, errorMessage: errorMessage } };
  };

  const navigateToPreviousLocation = () => {
    const previousLocation = localStorage.getItem("previousLocation");
    return previousLocation ? (
      <Navigate to={previousLocation} />
    ) : (
      <Navigate to="/" />
    );
  };

  return user ? (
    navigateToPreviousLocation()
  ) : (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random/?hairdresser)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              ref={(form) => setForm(form)}
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <BlueUnderlinedTextTypography
                    variant="body2"
                    onClick={() => navigate("/")}
                  >
                    Back to home
                  </BlueUnderlinedTextTypography>
                </Grid>
                <Grid item>
                  <BlueUnderlinedTextTypography
                    variant="body2"
                    onClick={() => navigate("/signin")}
                  >
                    Already have an account? Sign in
                  </BlueUnderlinedTextTypography>
                </Grid>
              </Grid>
            </Box>
            <Footer />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
