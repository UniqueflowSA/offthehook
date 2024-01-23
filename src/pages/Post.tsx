import CommentsComponents from "../components/CommentsComponents";
import MarkdownRenderer from "../components/MarkdownRenderer";

export function Post() {
  return (
    <>
      <MarkdownRenderer />
      <CommentsComponents />
    </>
  );
}
