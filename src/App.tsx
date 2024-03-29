import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import { Home, Post, SeriesPost, Footer, Header } from "./pages";

function App() {
  return (
    <StyledApp>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:category/:slug" element={<Post />} />
        <Route path="/series/:category/:slug" element={<SeriesPost />} />
      </Routes>

      <Footer />
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div``;
