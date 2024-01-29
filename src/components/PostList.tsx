import { Link } from "react-router-dom";
import styled from "styled-components";
import { textOverflow } from "./style/GlobalStyle";

type PostMetadata = {
  title: string;
  summary: string;
  date: string;
  category: string;
  slug: string;
  imgurl: string;
};

type PostListProps = {
  posts: PostMetadata[];
  listStyle: boolean;
};

function PostList({ posts, listStyle }: PostListProps) {
  return (
    <StyledPostListContainer $listStyle={listStyle}>
      {posts.map((post) => {
        return (
          <div key={post.slug}>
            {/*key를 slug로 지정  */}

            {/** 포스트 개별 링크생성 */}
            <Link
              className="link-style"
              to={`/posts/${post.category}/${post.slug}`}
            >
              <div className="post-list-item">
                {listStyle && (
                  <img src={post.imgurl} className="post-list-img" />
                )}
                <div className="post-list-text-container">
                  <div className="post-list-title">
                    <span>{post.title}</span>
                  </div>
                  <div className="post-list-summary">
                    <span>{post.summary}</span>
                  </div>
                  <div className="post-list-date">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </StyledPostListContainer>
  );
}

export default PostList;

const StyledPostListContainer = styled.div<{ $listStyle: boolean | undefined }>`
  display: grid;
  /* flex-direction: ${({ $listStyle }) => ($listStyle ? `column` : `row`)}; */
  grid-template-columns: ${({ $listStyle }) =>
    $listStyle ? `repeat(3, minmax(auto, 400px))` : `1fr`};
  grid-template-rows: ${({ $listStyle }) =>
    $listStyle ? `repeat(2, minmax(auto, 420px))` : `1fr`};
  row-gap: ${({ $listStyle }) => ($listStyle ? `.9rem;` : ``)};

  column-gap: 0.9rem;
  .link-style {
    text-decoration: none;
  }
  /** 이미지 리스트 */
  .post-list-item {
    height: 100%;
    color: black;
    &:hover {
      background-color: #000;
      color: #fff;
    }
    .post-list-img {
      max-width: 400px;
      max-height: 270px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .post-list-text-container {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      max-height: 150px;
      min-height: ${({ $listStyle }) => ($listStyle ? `0px` : `130px`)};
      height: 100%;
      padding: 1rem;
      border-bottom: 2px solid black;

      .post-list-title {
        ${textOverflow(1)}
        font-size: 1.5rem;
        font-weight: 700;
      }

      .post-list-summary {
        height: 2.4rem;
        line-height: 1.2rem;

        ${textOverflow(2)}
      }

      .post-list-date {
        font-size: 0.9rem;
        color: #656d78;
        display: flex;
        justify-content: space-between;
      }
    }
  }
`;
