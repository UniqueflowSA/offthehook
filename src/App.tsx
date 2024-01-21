import styled from "styled-components";
import GlobalStyle from "./components/GlobalStyle";
import CommentsComponents from "./components/CommentsComponents";
import MarkdownRenderer from "./components//MarkdownRenderer";

function App() {
  return (
    <>
      <GlobalStyle />
      <MarkdownRenderer />
      <CommentsComponents />
    </>
  );
}

export default App;
