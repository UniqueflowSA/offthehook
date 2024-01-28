import React, { createContext, useContext, useState, useEffect } from "react";

type PostMetadata = {
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
};

const PostContext = createContext<PostContextProps | undefined>(undefined);

export function PostProvider({ children }: any) {
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
    <PostContext.Provider value={{ posts, setPosts }}>
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
