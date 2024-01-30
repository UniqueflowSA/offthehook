import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import styled from "styled-components";
import "highlight.js/styles/tomorrow-night-bright.css";

import CommentsComponents from "../components/CommentsComponents";
import { usePostContext } from "../context";
type PostProps = {
  category?: string;
  slug: string;
};
function Post() {
  const [mdSource, setMdSource] = useState<string | null>(null);
  const { category, slug } = useParams<PostProps>(); //category 폴더 추가시에 추가요망
  const { posts } = usePostContext();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPostContent = async () => {
      try {
        const response = await fetch(`./notes/${category}/${slug}.md`);
        //이거 수정해야해
        if (!response.ok) {
          throw new Error("Error fetching post");
        }
        const mdSource = await response.text();

        setMdSource(mdSource);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };

    fetchPostContent();
  }, [slug]);

  //postData가져오기
  const getPostMetaData = posts.find((post) => slug === post.slug);
  if (!getPostMetaData) {
    return <div>Loading...</div>;
  }
  const { title, date, imgurl } = getPostMetaData;

  return (
    <StyledMarkdownContainer>
      <div className="md-title-container">
        <div className="md-title-text-container">
          <div className="md-title-name">{title}</div>
          <div className="md-title-date">{date}</div>
        </div>
        <div className="title-underline"></div>
        <div>
          <img className="md-title-img" src={imgurl} alt="" />
        </div>
      </div>
      <div className="md-contents-container">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {mdSource}
        </ReactMarkdown>
        <div className="home-button">
          <button onClick={() => navigate("/")}>Home</button>
        </div>
        <div className="comments-list-name">Comments</div>
        <CommentsComponents />
      </div>
    </StyledMarkdownContainer>
  );
}

export default Post;

const StyledMarkdownContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  .md-title-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 3rem;
    .title-underline {
      width: 100%;
      border-bottom: 1px solid #000;
    }
    .md-title-text-container {
      padding: 3rem;
      .md-title-name {
        font-size: 3.5rem;
        font-weight: 600;
        margin-bottom: 2rem;
      }
      .md-title-date {
        text-align: center;
      }
    }

    .md-title-img {
      padding: 3rem 0;
      height: 25rem;
      object-fit: cover;
    }
  }
  .md-contents-container {
    max-width: 900px;
    padding: 0 3rem;
    margin: 0 auto;
    .comments-list-name {
      font-size: 2rem;
      font-weight: 800;
      border-bottom: 8px solid #000;
      margin: 1rem 0;
    }
  }
`;
