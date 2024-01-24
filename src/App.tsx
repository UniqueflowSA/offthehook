import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PostList, Post } from "./pages";

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
      <Routes>
        <Route path="/" element={<PostList posts={posts} />} />
        <Route path="/posts/:project/:slug" element={<Post />} />
      </Routes>
    </>
  );
}

export default App;
