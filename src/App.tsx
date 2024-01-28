import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import { Home, Post, Footer, Header } from "./pages";

function App() {
  return (
    <StyledApp>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:category/:slug" element={<Post />} />
      </Routes>

      <Footer />
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div``;
