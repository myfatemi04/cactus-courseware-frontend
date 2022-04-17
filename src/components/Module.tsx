import React, { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import Question from "./Question";
import Video from "./Video";
import rehypeMathJax from "rehype-mathjax";
import rehypeHighlight from "rehype-highlight";
import remarkMath from "remark-math";

import {
  Module as ModuleType,
  Question as QuestionType,
  Tree as TreeType,
} from "../types";

export const exampleTree: TreeType = {
  name: "Machine Learning Course",
  children: [
    {
      name: "Introduction",
    },
  ],
};

export const exampleModule: ModuleType = {
  title: "Example Module",
  markdown: `
# Machine Learning Tutorial

Get started with ML!

???
Question:
How many sides does a square have?
( ) 1 
( ) 2
( ) 3
(x) 4
Explanation:
A square has 4 sides.
???
\`\`\`
list = []
\`\`\`
$ X^2 = y $
Video: https://www.youtube.com/watch?v=rvVF5QWSYF4
Video: https://www.youtube.com/watch?v=Y5dylh2aOiw
Video: https://www.youtube.com/embed/Y5dylh2aOiw
Here is a GIF: 
![](http://www.reactiongifs.us/wp-content/uploads/2013/10/nuh_uh_conan_obrien.gif)

arctic picture \
![](logo192.png)

End of section.

`,
  modules: [],
};

export const rehypePlugins = [rehypeMathJax, rehypeHighlight];
export const remarkPlugins = [remarkMath];

export function splitMarkdownIntoChunks(markdown: string): ReactNode[] {
  const chunks: ReactNode[] = [];

  const lines = markdown.split("\n");
  let prevChunk = "";
  let inQuestion = false;

  let question: QuestionType = {
    text: "",
    type: "multiple",
    answers: [],
    explanation: "",
  };

  let questionSection: "question" | "explanation" = "question";

  function endQuestion() {
    inQuestion = false;
    chunks.push(<Question question={question} />);
    question = {
      text: "",
      type: "multiple",
      answers: [],
      explanation: "",
    };
  }

  function endBody() {
    inQuestion = true;
    chunks.push(
      <ReactMarkdown
        rehypePlugins={rehypePlugins}
        remarkPlugins={remarkPlugins}
      >
        {prevChunk}
      </ReactMarkdown>
    );
    prevChunk = "";
  }

  for (const line of lines) {
    if (line === "???") {
      if (inQuestion) {
        endQuestion();
      } else {
        endBody();
      }
      continue;
    }

    if (inQuestion) {
      if (line.trim().toLowerCase() === "question:") {
        questionSection = "question";
      } else if (line.trim().toLowerCase() === "explanation:") {
        questionSection = "explanation";
      } else {
        if (questionSection === "question") {
          if (line.startsWith("[")) {
            question.type = "multiple";
            let correct = line.charAt(1) === "x";
            question.answers.push({
              correct,
              text: line.substring(3).trim(),
            });
          } else if (line.startsWith("(")) {
            question.type = "single";
            let correct = line.charAt(1) === "x";
            question.answers.push({
              correct,
              text: line.substring(3).trim(),
            });
          } else {
            question.text += "\n" + line;
          }
        } else if (questionSection === "explanation") {
          question.explanation += "\n" + line;
        }
      }
    } else {
      if (line.trim().toLowerCase().startsWith("video:")) {
        let url = line.substring(7); // "video: " is 7 characters
        if (!url.includes("/embed/")) {
          // console.log(url);
          url = url.replace("watch?v=", "embed/");
        }
        chunks.push(<Video link={url} />);
      } else {
        prevChunk += "\n" + line;
      }
    }
  }

  if (inQuestion) {
    endQuestion();
  } else {
    endBody();
  }

  return chunks;
}

export function Tree({
  tree,
  highlight = null,
  onClick,
}: {
  tree: TreeType;
  highlight: number[] | null;
  onClick?: (path: number[]) => void;
}) {
  return (
    <div>
      <button onClick={() => onClick?.([])}>{tree.name}</button>
      <div style={{ marginTop: 0, paddingLeft: "1rem" }}>
        {tree.children?.map((subtree, index) => (
          <div key={subtree.name}>
            <Tree
              tree={subtree}
              highlight={
                highlight
                  ? highlight[0] === index
                    ? highlight.slice(1)
                    : []
                  : null
              }
              onClick={(path) => {
                onClick?.([index, ...path]);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Module({
  data,
  path,
}: {
  data: ModuleType;
  path: string;
}) {
  return (
    <div
      style={{
        textAlign: "left",
        minWidth: "40rem",
        margin: "0 2rem",
        padding: "0.5rem",
        border: "1px solid white",
      }}
    >
      {splitMarkdownIntoChunks(data.markdown)}
    </div>
  );
}
