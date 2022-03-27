import { useState } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FacebookIcon from "@mui/icons-material/Facebook";
import RedditIcon from "@mui/icons-material/Reddit";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppDescription from "../components/AppDescription";
import BarberList from "../components/BarberList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import customerReviews from "../components/CustomerReviews";

// TODO Currently user is redirected to barber offer page
// when he click on one of barbers on the list. Then when user clicks
// back arrow in the browser he is redirected to this page again,
// but search results are lost and user has to search for barbers again.
// It should work that search phrase is saved, but one must think
// in what cases and how search phrase should be saved.

const mainImageWithTextProps = {
  title: "Getting a new haircut easier than ever before...",
  description:
    "BookMe is a free booking platform, in which you can easily find a free date and make an appointment conveniently. No calling - you book anytime and from everywhere.",
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
  boxShadow: "0px 0px 3px 0px rgb(0 0 0 / 20%)",
};

const theme = createTheme();

export default function CustomerLandingPage() {
  const [isSearch, setIsSearch] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [pendingSearchPhrase, setPendingSearchPhrase] = useState("");

  function handleOnRequestSearch() {
    setSearchPhrase(pendingSearchPhrase);
    if (pendingSearchPhrase !== "") {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
  }

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
          <SearchBar
            onChange={(searchText) => setPendingSearchPhrase(searchText)}
            onRequestSearch={handleOnRequestSearch}
            style={searchBarStyle}
          />
          {isSearch ? (
            <BarberList searchPhrase={searchPhrase} />
          ) : (
            <AppDescription
              mainImage={mainImageWithTextProps}
              sideBar={sidebarProps}
              reviews={customerReviews}
            />
          )}
        </main>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
