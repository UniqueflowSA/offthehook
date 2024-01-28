import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import styled from "styled-components";

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
  const { title, date } = getPostMetaData;

  return (
    <StyledMarkdownContainer>
      <div className="mdTitle">
        <div>{title}</div>
        <div>{date}</div>
      </div>
      <ReactMarkdown className="mdContents" rehypePlugins={[rehypeHighlight]}>
        {mdSource}
      </ReactMarkdown>
      <div className="home-button">
        <button onClick={() => navigate("/")}>Home</button>
      </div>
      <div>
        <CommentsComponents />
      </div>
    </StyledMarkdownContainer>
  );
}

export default Post;

const StyledMarkdownContainer = styled.div`
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
`;
