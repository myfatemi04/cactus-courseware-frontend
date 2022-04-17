import ReactMarkdown from "react-markdown";
import rehypeMathJax from "rehype-mathjax";
import remarkMath from "remark-math";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { twilight as theme } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const rehypePlugins = [rehypeMathJax];
export const remarkPlugins = [remarkMath];

export default function CustomMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      rehypePlugins={rehypePlugins}
      remarkPlugins={remarkPlugins}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              style={theme}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
