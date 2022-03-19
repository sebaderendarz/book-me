import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import RedditIcon from "@mui/icons-material/Reddit";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import AppDescription from "../components/AppDescription";
import BarberList from "../components/BarberList";

const rows = [
  {
    id: 1,
    address: "st. Solna 24",
    barberName: "Naughty Alice",
    city: "Warsaw",
    price: "50.00",
    thumbnail: null,
    updatedAt: "2020-03-18T08:26:30+0000",
  },
  {
    id: 2,
    address: "st. Solna 24",
    barberName: "Dirty Joey",
    city: "Warsaw",
    price: "70.00",
    thumbnail: null,
    updatedAt: "2021-03-18T08:26:30+0000",
  },
  {
    id: 3,
    address: "st. Solna 24",
    barberName: "Sneaky Martin",
    city: "Warsaw",
    price: "90.00",
    thumbnail: null,
    updatedAt: "2022-03-18T08:26:30+0000",
  },
];

const mainImageWithTextProps = {
  title: "Getting a new haircut easier than ever before...",
  description:
    "BookMe is a free booking platform, in which you can easily find a free date and make an appointment conveniently. No calling - you book anytime and from anywhere.",
  image: "https://source.unsplash.com/random/?hairdresser",
  imageText: "Image not available.",
};

const sidebarProps = {
  title: "About",
  description:
    "BookMe is a group of geeks that strives to take the hairdressing industry to the next level. We do our best to allow people around the world to book hairdresser's service seamlessly.",
  social: [
    { name: "Twitter", icon: TwitterIcon, url: "https://twitter.com/bookme" },
    {
      name: "Facebook",
      icon: FacebookIcon,
      url: "https://facebook.com/bookme",
    },
    { name: "Reddit", icon: RedditIcon, url: "https://reddit.com/bookme" },
  ],
};

const searchBarStyle = {
  margin: "0 auto",
  marginTop: 80,
  marginBottom: 80,
  maxWidth: 800,
  height: 60,
  boxShadow: "0px 0px 1px 1px #e0e0e0",
};

const theme = createTheme();

export default function CustomerLandingPage() {
  const [searchPhrase, setSearchPhrase] = useState("");

  function handleOnRequestSearch(searchText) {
    console.log(searchText);
    setSearchPhrase(searchText);
    // TODO Trigger api call here?
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <SearchBar
            onChange={(searchText) => setSearchPhrase(searchText)}
            onRequestSearch={handleOnRequestSearch}
            style={searchBarStyle}
          />
          <BarberList rows={rows} />
        </main>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
