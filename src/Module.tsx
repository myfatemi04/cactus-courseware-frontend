import React, { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import Question from "./Question";
import {
  Module as ModuleType,
  Question as QuestionType,
  Tree as TreeType,
} from "./types";

export const exampleModule: ModuleType = {
  name: "Example Module",
  markdown: `
# Machine Learning Tutorial

Get started with ML!

???
Question: What is machine learning?
[ ] Test
[x] Test 2
( ) Test 3
???

Done

`,
  modules: [],
};

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
    chunks.push(<ReactMarkdown>{prevChunk}</ReactMarkdown>);
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
      }

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
    } else {
      prevChunk += "\n" + line;
    }
  }

  if (inQuestion) {
    endQuestion();
  } else {
    endBody();
  }

  return chunks;
}

export function Tree({ tree }: { tree: TreeType }) {
  return (
    <>
      {tree.name}
      <ul>
        {tree.children?.map((subtree) => (
          <li key={subtree.name}>
            <Tree tree={subtree} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Module({
  data,
  tree,
  path,
}: {
  data: ModuleType;
  tree: TreeType;
  path: string;
}) {
  return (
    <div className="App">
      <div
        style={{
          textAlign: "left",
          border: "1px solid white",
          padding: "0.5rem",
        }}
      >
        <Tree tree={tree} />
      </div>
      <h1>{data.name}</h1>
      <div
        style={{
          textAlign: "left",
          minWidth: "40rem",
          margin: "2rem",
          padding: "0.5rem",
          border: "1px solid white",
        }}
      >
        {splitMarkdownIntoChunks(exampleModule.markdown)}
        {/* <ReactMarkdown>{data.markdown}</ReactMarkdown> */}
      </div>
    </div>
  );
}
