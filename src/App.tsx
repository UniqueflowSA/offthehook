import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import { PostList, Post } from "./pages";
import { Footer, Header } from "./components";

type PostMetadata = {
  title: string;
  summary: string;
  date: string;
  project: string;
  slug: string;
};

function App() {
  const [posts, setPosts] = useState<PostMetadata[]>([]);

  const fetchPostsMetadata = async () => {
    const response = await fetch("./notes/metadata.json", {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPostsMetadata();
  }, []);
  return (
    <>
      <StyledHeader />
      <Routes>
        <Route path="/" element={<PostList posts={posts} />} />
        <Route path="/posts/:project/:slug" element={<Post />} />
      </Routes>
      <StyledFooter />
    </>
  );
}

export default App;

const StyledHeader = styled(Header)`
  height: 120px;
`;
const StyledFooter = styled(Footer)`
  height: 120px;
`;
