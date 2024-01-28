import { useState, useEffect } from "react";
import styled from "styled-components";
import { usePostContext } from "../context";
import { PostList } from "../components";

function Home() {
  //contextAPI 호출로 posts값 가져오기
  const { posts } = usePostContext();

  const allPosts = posts.filter((post) => post.category !== "notice");
  // const recommendedPosts = posts.filter(
  //   (post) => post.slug === "1" || "2" || "3"
  // );

  return (
    <StyledHomeContainer>
      <div className="main-title"></div>
      <div className="home-menu-container">
        <div className="post-list-wrapper recommend">
          <div className="post-list-name">Recommend</div>
          <PostList posts={posts} listStyle={true} />
        </div>
        <div className="post-list-wrapper all">
          <div className="post-list-name">All</div>
          <PostList posts={allPosts} listStyle={false} />
        </div>
      </div>
    </StyledHomeContainer>
  );
}

export default Home;

const StyledHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .main-title {
    width: 100%;
    height: 40rem;
    background-image: url(https://images.unsplash.com/photo-1641242294785-663780a53f76?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
    background-size: cover;
  }
  .home-menu-container {
    width: 62%;
    max-width: 1200px;
    .post-list-wrapper {
      .post-list-name {
        font-size: 2rem;
        font-weight: 800;
        border-bottom: 8px solid #000;
        margin: 1rem 0;
      }
      &.recommend {
        margin-top: 7rem;
      }

      &.all {
        margin-top: 4rem;
      }
    }
  }
`;
