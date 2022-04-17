import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeMathJax from "rehype-mathjax";
import remarkMath from "remark-math";

export const rehypePlugins = [rehypeMathJax, rehypeHighlight];
export const remarkPlugins = [remarkMath];

export default function CustomMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown rehypePlugins={rehypePlugins} remarkPlugins={remarkPlugins}>
      {children}
    </ReactMarkdown>
  );
}
