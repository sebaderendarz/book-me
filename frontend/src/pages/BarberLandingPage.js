import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import RedditIcon from "@mui/icons-material/Reddit";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import barberReviews from "../components/BarberReviews";
import AppDescription from "../components/AppDescription";

const mainImageWithTextProps = {
  title: "Offer Your service easier than ever before...",
  description:
    "BookMe is a free booking platform, in which you can easily offer hairdresser's service. A few steps and people around a world can book the visit in your hair salon.",
  image: "https://source.unsplash.com/random/?hairdresser",
  imageText: "Image not available.",
};

const sidebarProps = {
  title: "About",
  description:
    "BookMe is a group of geeks that strives to take the hairdressing industry to the next level. We do our best to allow hairdressers around the world to offer services seamlessly.",
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

const theme = createTheme();

export default function BarberLandingPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <AppDescription
            mainImage={mainImageWithTextProps}
            sideBar={sidebarProps}
            reviews={barberReviews}
          />
        </main>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}