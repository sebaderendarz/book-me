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
  title: "Experience like never before...",
  description: "test dummy page",
  image: "https://source.unsplash.com/random/?girl+party",
  imageText: "Image not available.",
};

const sidebarProps = {
  title: "About",
  description: "Pitu Pitu about nothing at all.",
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

export default function TestPrivatePage() {
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
