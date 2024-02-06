// import { useState, useEffect } from "react";
import styled from "styled-components";
import { usePostContext } from "../context";
import { PostList } from "../components";

function Home() {
  //contextAPI 호출로 posts값 가져오기
  const { posts, seriesPost } = usePostContext();
  const recommendedPosts = [posts[1], posts[2], posts[3]].filter(Boolean);
  const seriesList = seriesPost.filter(
    (post) => post.slug.charAt(post.slug.length - 1) === "0"
  );
  console.log(seriesList);

  return (
    <StyledHomeContainer>
      <div className="main-title"></div>
      <div className="home-menu-container">
        <div className="post-list-wrapper recommend">
          <div className="post-list-name">Recommend</div>
          <PostList posts={recommendedPosts} listStyle={true} />
        </div>
        <div className="post-list-wrapper all">
          <div className="post-list-name">Series</div>
          <PostList posts={seriesList} listStyle={false} isSeriesPost={true} />
        </div>
        <div className="post-list-wrapper all">
          <div className="post-list-name">All</div>
          <PostList posts={posts} listStyle={false} />
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
