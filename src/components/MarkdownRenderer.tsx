import React from "react";
import ReactMarkdown from "react-markdown";

const markdown = `
  # 헤딩

  **굵게**
  
  일반 텍스트
`;

function MarkdownRenderer() {
  return (
    <div>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
export default MarkdownRenderer;
