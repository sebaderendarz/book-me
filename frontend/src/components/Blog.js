import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import RedditIcon from "@mui/icons-material/Reddit";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import post1 from "./blog-post.1.md";
import post2 from "./blog-post.2.md";
import post3 from "./blog-post.3.md";

const mainFeaturedPost = {
  title: "Getting a new haircut easier than ever before...",
  description:
    "BookMe is a free booking application, in which you can easily find a free date and make an appointment conveniently. No calling - you book anytime and from anywhere.",
  image: "https://source.unsplash.com/random",
  imageText: "Dummy Image Description",
};

const posts = [post1, post2, post3];

const sidebar = {
  title: "About",
  description:
    "BookMe is a group of geeks that strives to take the hairdressing industry to the next level. We do our best to allow people around a world to book barber's service seamlessly.",
  social: [
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
    { name: "Reddit", icon: RedditIcon },
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

export default function Blog() {
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
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="Reviews" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
