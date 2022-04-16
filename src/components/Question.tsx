import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Question as QuestionType } from "../types";

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
      <span>{question.text}</span>
      <form style={{ display: "flex", flexDirection: "column" }}>
        {question.answers.map((answer, index) => {
          const id = `question-${question.text}-answer-${index}`;
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                style={{ marginRight: "0.5rem" }}
                type={question.type === "multiple" ? "checkbox" : "radio"}
                name="answer"
                id={id}
                checked={selectedAnswers.includes(index)}
                onClick={(e) => {
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
                {answer.text}
              </label>
            </div>
          );
        })}
        <div>
          {correct === null ? (
            <button onClick={confirm} disabled={!hasValidAnswer}>
              Confirm
            </button>
          ) : correct === false ? (
            <>
              <br />❌ Incorrect.
              <ReactMarkdown>{question.explanation}</ReactMarkdown>
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
