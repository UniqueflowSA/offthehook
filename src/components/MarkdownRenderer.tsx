import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { posts } from "../../public/notes/index.js";

const MarkdownPost = ({ match }: any) => {
  const markdown = require(`./posts/${match.params.key}.md`).default;
  return <ReactMarkdown source={markdown} />;
};

const PostLink = ({ key }: any) => (
  <li>
    <Link to={`/post/${key}`}>{key}</Link>
  </li>
);

function MarkdownRenderer() {
  // const [markdown, setMarkdown] = useState("");

  return;
  <Router>
    <div>
      <ul>
        {posts.map((key: string) => (
          <PostLink key={key} />
        ))}
      </ul>

      <Route path="/post/:key" component={MarkdownPost} />
    </div>
  </Router>;
}
export default MarkdownRenderer;
