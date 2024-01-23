import styled from "styled-components";
import GlobalStyle from "./components/GlobalStyle";
import { Post } from "./pages/Post";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Post />} />
          {/* <Route path="/" element={<Post />} />
          <Route path="/" element={<Post />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
