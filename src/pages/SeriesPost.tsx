import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import styled from "styled-components";
import "highlight.js/styles/tomorrow-night-bright.css";
import { VscCheck, VscMenu } from "react-icons/vsc";

import { textOverflow } from "../components/style/GlobalStyle";
import CommentsComponents from "../components/CommentsComponents";
import { usePostContext } from "../context";
type SeriesMetadata = {
  title: string;
  summary: string;
  date: string;
  category: string;
  slug: string;
  imgurl: string;
};
type PostProps = {
  category?: string;
  slug: string;
};
type SeriesSidebarProps = {
  seriesPost: SeriesMetadata[];
  currentCategory: string | undefined;
  currentSlug: string | undefined;
};
function ListSidebar({
  seriesPost,
  currentCategory,
  currentSlug,
}: SeriesSidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const postCategory = seriesPost.filter(
    (post) => post.category === currentCategory
  );

  return (
    <StyledListSidebar>
      <button onClick={handleToggleSidebar}>
        <VscMenu />
      </button>
      {isSidebarOpen && (
        <div className="series-sidebar-container">
          <div className="sidebar-container-line">
            <ul className="series-sidebar-ul">
              {postCategory.map((post) => (
                <li key={post.slug} className="series-sidebar-li">
                  <Link
                    to={`/series/${currentCategory}/${post.slug}`}
                    className="series-sidebar-link"
                  >
                    {post.title}
                  </Link>
                  <div
                    className={`sidebar-li-currentpost ${
                      post.slug === currentSlug ? "active" : ""
                    }`}
                  >
                    <VscCheck />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </StyledListSidebar>
  );
}

function SeriesPost() {
  const [mdSource, setMdSource] = useState<string | null>(null);
  const { category, slug } = useParams<PostProps>(); //category 폴더 추가시에 추가요망
  const { seriesPost } = usePostContext();
  useEffect(() => {
    const fetchPostContent = async () => {
      try {
        const response = await fetch(`/notes/series/${category}/${slug}.md`);
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
  const getPostMetaData = seriesPost.find((post) => slug === post.slug);
  if (!getPostMetaData) {
    return <div>Loading...</div>;
  }
  const { title, date, imgurl } = getPostMetaData;

  return (
    <StyledMarkdownContainer>
      <ListSidebar
        seriesPost={seriesPost}
        currentCategory={category}
        currentSlug={slug}
      />
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

        <div className="comments-list-name">Comments</div>
        <CommentsComponents />
      </div>
    </StyledMarkdownContainer>
  );
}

export default SeriesPost;

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
      margin: 10rem 0 1rem;
    }
  }
`;
const StyledListSidebar = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row-reverse;
  height: 100%;
  & button {
    border-radius: 50%;
    cursor: pointer;
    background-color: #f5f4ec;
    font-size: 1.3rem;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    padding-top: 0.2rem;
    width: 3rem;
    height: 3rem;
    &:hover {
      background-color: #000;
      color: #f5f4ec;
    }
  }
  .series-sidebar-container {
    box-sizing: border-box;
    width: 15rem;
    height: 85%;
    padding: 0.5rem;
    color: #000;
    background-color: transparent;
    .sidebar-container-line {
      background-color: #f5f4ec;
      height: 100%;
      border: 0.15rem solid #000;
      .series-sidebar-ul {
        font-size: 1rem;
        margin: 0;
        padding: 0;

        .series-sidebar-li {
          padding: 1rem 0.5rem;
          height: 1rem;

          border-bottom: 0.13rem solid #000;
          display: flex;
          justify-content: space-between;
          color: #000;
          font-weight: 500;
          &:hover {
            background-color: #000;
            color: #f5f4ec;
          }
          .series-sidebar-link {
            ${textOverflow(1)}
            color: inherit;
            width: 10rem;
            text-decoration: none;
            align-items: center;
          }

          .sidebar-li-currentpost {
            display: none;
            &.active {
              font-size: 1.3rem;
              display: inline;
            }
          }
        }
      }
    }
  }
`;
