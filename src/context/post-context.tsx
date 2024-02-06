import React, { createContext, useContext, useState, useEffect } from "react";

type PostMetadata = {
  title: string;
  summary: string;
  date: string;
  category: string;
  slug: string;
  imgurl: string;
};
type SeriesMetadata = {
  title: string;
  summary: string;
  date: string;
  category: string;
  slug: string;
  imgurl: string;
};
type PostContextProps = {
  posts: PostMetadata[];
  setPosts: React.Dispatch<React.SetStateAction<PostMetadata[]>>;
  seriesPost: SeriesMetadata[];
  setSeriesPost: React.Dispatch<React.SetStateAction<SeriesMetadata[]>>;
};

const PostContext = createContext<PostContextProps | undefined>(undefined);

export function PostProvider({ children }: any) {
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  const [seriesPost, setSeriesPost] = useState<SeriesMetadata[]>([]);
  const fetchPostsMetadata = async () => {
    const response = await fetch("./notes/metadata.json", {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    setPosts(data);
  };
  const fetchSeriesMetadata = async () => {
    const response = await fetch("/notes/series/metadata.json", {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    setSeriesPost(data);
  };

  useEffect(() => {
    fetchPostsMetadata();
    fetchSeriesMetadata();
  }, []);
  return (
    <PostContext.Provider
      value={{ posts, setPosts, seriesPost, setSeriesPost }}
    >
      {children}
    </PostContext.Provider>
  );
}
export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
