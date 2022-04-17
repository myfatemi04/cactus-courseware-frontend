import { Button, Checkbox, Radio } from "@mui/material";
import { ChangeEvent, useState } from "react";
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
    <div style={{ padding: "1rem 0" }}>
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
          const props = {
            style: { marginRight: "0.5rem" },
            name: "answer",
            id,
            checked: selectedAnswers.includes(index),
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
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
            },
          };
          return (
            <div style={{ display: "flex", alignItems: "center" }} key={id}>
              {question.type === "multiple" ? (
                <Checkbox {...props} />
              ) : (
                <Radio {...props} />
              )}
              <label
                htmlFor={id}
                style={{
                  cursor: "pointer",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
              >
                <CustomMarkdown>{answer.text}</CustomMarkdown>
              </label>
            </div>
          );
        })}
        <br />
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
              <span style={{ margin: "1rem 0" }}>❌ Incorrect.</span>
              <br />
              <br />
              <CustomMarkdown>{question.explanation}</CustomMarkdown>
            </>
          ) : (
            <span>🎉 Correct.</span>
          )}
        </div>
      </form>
    </div>
  );
}
