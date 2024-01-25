import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import CommentsComponents from "../components/CommentsComponents";

type PostProps = {
  project: string;
  slug: string;
};

function Post() {
  const [mdSource, setMdSource] = useState<string | null>(null);
  const { project, slug } = useParams<PostProps>();

  useEffect(() => {
    const fetchPostContent = async () => {
      try {
        const response = await fetch(`./notes/${slug}.md`);
        //이거 수정해야해
        if (!response.ok) {
          throw new Error("Error fetching post");
        }
        const mdSource = await response.text();
        console.log(response);
        console.log(mdSource);
        setMdSource(mdSource);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };

    fetchPostContent();
  }, [slug]);

  return (
    <div className="post">
      <>
        <ReactMarkdown className="markdown" rehypePlugins={[rehypeHighlight]}>
          {mdSource}
        </ReactMarkdown>
        <div className="home-button">
          <Link to="/">Home</Link>
        </div>
        <div>
          <CommentsComponents />
        </div>
      </>
    </div>
  );
}

export default Post;
