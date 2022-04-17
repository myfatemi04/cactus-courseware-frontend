import { Button } from "@mui/material";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Question as QuestionType } from "../types";
import CustomMarkdown from "./CustomMarkdown";

export default function Question({ question }: { question: QuestionType }) {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  function grade() {
    if (question.type === "single") {
      if (selectedAnswers.length === 1) {
        const index = selectedAnswers[0];
        const answer = question.answers[index];
        return answer.correct;
      }
      return false;
    } else {
      for (let i = 0; i < question.answers.length; i++) {
        if (question.answers[i].correct !== selectedAnswers.includes(i)) {
          return false;
        }
      }
      return true;
    }
  }

  const [correct, setCorrect] = useState<boolean | null>(null);

  function confirm() {
    setCorrect(grade());
  }

  const hasValidAnswer =
    (question.type === "single" && selectedAnswers.length === 1) ||
    (question.type === "multiple" && selectedAnswers.length > 0);

  return (
    <div>
      <b>
        {question.type === "multiple"
          ? "Select all answers that apply."
          : "Select the correct answer."}
      </b>
      <br />
      <CustomMarkdown>{question.text}</CustomMarkdown>
      <form style={{ display: "flex", flexDirection: "column" }}>
        {question.answers.map((answer, index) => {
          const id = `question-${question.text}-answer-${index}`;
          return (
            <div style={{ display: "flex", alignItems: "center" }} key={id}>
              <input
                style={{ marginRight: "0.5rem" }}
                type={question.type === "multiple" ? "checkbox" : "radio"}
                name="answer"
                id={id}
                checked={selectedAnswers.includes(index)}
                onChange={(e) => {
                  if (correct !== null) {
                    return;
                  }
                  if (question.type === "multiple") {
                    if (!selectedAnswers.includes(index)) {
                      setSelectedAnswers([...selectedAnswers, index]);
                    } else {
                      setSelectedAnswers(
                        selectedAnswers.filter((i) => i !== index)
                      );
                    }
                  } else {
                    setSelectedAnswers([index]);
                  }
                }}
              />
              <label
                htmlFor={id}
                style={{ userSelect: "none", WebkitUserSelect: "none" }}
              >
                <CustomMarkdown>{answer.text}</CustomMarkdown>
              </label>
            </div>
          );
        })}
        <div>
          {correct === null ? (
            <Button
              onClick={confirm}
              disabled={!hasValidAnswer}
              variant="contained"
            >
              Confirm
            </Button>
          ) : correct === false ? (
            <>
              <br />❌ Incorrect.
              <CustomMarkdown>{question.explanation}</CustomMarkdown>
            </>
          ) : (
            <>
              <br />
              <span>🎉 Correct.</span>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
