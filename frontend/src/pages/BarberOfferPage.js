import { useState } from "react";
import { useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BarberOfferDescription from "../components/BarberOfferDescription";

const barberDescription = {
  id: 1,
  address: "st. Solna 24",
  barber_name: "Naughty Alice",
  city: "Warsaw",
  price: "50.00",
  thumbnail: null,
  specialization: "WOMEN",
  open_hours: "10AM-6PM",
  working_days: "Monday-Sunday",
  description:
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
};

const theme = createTheme();

export default function BarberOfferPage() {
  const { offer_id } = useParams();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{
          bgcolor: "white",
          boxShadow: "0px 0px 2px 0px rgb(0 0 0 / 20%)",
          minHeight: "100vh",
        }}
      >
        <Header accountType={"CUSTOMER"} />
        <main>
          <BarberOfferDescription offerDetails={barberDescription} />
        </main>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
