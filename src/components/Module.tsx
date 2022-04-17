import { Collapse, List, ListItem, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { getPreviousPath, getNextPath } from "../pathutil";
import {
  Course,
  Module as ModuleType,
  Question as QuestionType,
} from "../types";
import { CourseContext } from "./CourseContext";
import CustomMarkdown from "./CustomMarkdown";
import Question from "./Question";
import Video from "./Video";

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
    chunks.push(<Question key={chunks.length} question={question} />);
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
      <CustomMarkdown key={chunks.length}>{prevChunk}</CustomMarkdown>
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

export function ModuleTree({
  module,
  highlight = null,
  onClick,
  depth,
}: {
  module: ModuleType;
  highlight: number[] | null;
  onClick?: (path: number[]) => void;
  depth: number;
}) {
  const highlighted = Array.isArray(highlight) && highlight.length === 0;
  const [opened, setOpened] = useState(false);

  const hasHighlightedChild = Array.isArray(highlight) && highlight.length > 0;

  useEffect(() => {
    setOpened(hasHighlightedChild);
  }, [hasHighlightedChild]);

  if (module.modules.length === 0) {
    return (
      <ListItem
        button
        onClick={() => {
          onClick?.([]);
        }}
        style={{
          backgroundColor: highlighted ? "#eee" : "",
          color: opened ? "#000" : "",
        }}
      >
        <ListItemText primary={module.title} />
      </ListItem>
    );
  }
  return (
    <div>
      <ListItem
        button
        onClick={() => {
          onClick?.([]);
          setOpened((opened) => !opened);
        }}
        sx={{ pl: depth * 3 }}
        style={{
          backgroundColor: highlighted ? "#eee" : "",
          color: opened ? "#000" : "",
        }}
      >
        <ListItemText primary={module.title} />
        {opened ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={opened} timeout="auto" unmountOnExit>
        <List>
          {module.modules.map((submodule, index) => {
            return (
              <div key={submodule.title}>
                <ModuleTree
                  module={submodule}
                  highlight={
                    highlight && highlight[0] === index
                      ? highlight.slice(1)
                      : null
                  }
                  onClick={(path) => {
                    onClick?.([index, ...path]);
                  }}
                  depth={depth + 1}
                />
              </div>
            );
          })}
        </List>
      </Collapse>
      {/* <button
        onClick={() => onClick?.([])}
        style={{
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          textDecoration: "underline",
          fontWeight: highlighted ? "bold" : "normal",
        }}
      >
        {module.title}
      </button> */}
    </div>
  );
}

export default function Module({
  course,
  data,
}: {
  course: Course;
  data: ModuleType;
}) {
  const { setPath } = useContext(CourseContext);

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

      <Button
        onClick={() =>
          setPath((path) => {
            return getPreviousPath(course.rootModule, path) || path;
          })
        }
      >
        Previous
      </Button>
      <Button
        onClick={() =>
          setPath((path) => {
            return getNextPath(course.rootModule, path) || path;
          })
        }
      >
        Next
      </Button>
    </div>
  );
}
