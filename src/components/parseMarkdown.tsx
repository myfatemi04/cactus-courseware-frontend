import { ReactNode } from "react";
import {Question as QuestionType} from "../types";
import CustomMarkdown from "./CustomMarkdown";
import { JupyterNotebookEmbedded } from "./JupyterNotebook";
import Question from "./Question";
import Video from "./Video";

export function parseMarkdown(markdown: string): ReactNode[] {
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
        const lineStart = line.trim().toLowerCase();
        if (lineStart.startsWith("video:")) {
          let url = line.substring(7); // "video: " is 7 characters
          if (!url.includes("/embed/")) {
            url = url.replace("watch?v=", "embed/");
          }
          chunks.push(<Video link={url} />);
        } else if (lineStart.startsWith("jupyter:")) {
          const url = line.substring(9); // "jupyter: " is 9 characters
          chunks.push(<JupyterNotebookEmbedded url={url} />);
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