import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import RedditIcon from "@mui/icons-material/Reddit";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import ImageWithCustomizableText from "./ImageWithCustomizableText";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import customerReviews from "./CustomerReviews";
import MarkdownList from "./MarkdownList";

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <SearchBar
            onChange={() => console.log("onChange")}
            onRequestSearch={() => console.log("onRequestSearch")}
            style={searchBarStyle}
          />
          <ImageWithCustomizableText data={mainImageWithTextProps} />
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <MarkdownList title="Reviews" reviews={customerReviews} />
            <Sidebar {...sidebarProps} />
          </Grid>
        </main>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
