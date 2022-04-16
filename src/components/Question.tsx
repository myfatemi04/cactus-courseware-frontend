import { useCallback, useState } from "react";
import { Question as QuestionType } from "../types";

export default function Question({ question }: { question: QuestionType }) {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const confirm = useCallback(() => {}, []);

  return (
    <div>
      <span>{question.text}</span>
      <form style={{ display: "flex", flexDirection: "column" }}>
        {question.answers.map((answer, index) => {
          const id = `question-${question.text}-answer-${index}`;
          return (
            <div>
              <input
                type={question.type === "multiple" ? "checkbox" : "radio"}
                name="answer"
                id={id}
                checked={selectedAnswers?.includes(index)}
                onClick={(e) => {}}
              />
              <label htmlFor={id}>{answer.text}</label>
            </div>
          );
        })}
      </form>
      <button onClick={confirm}>Confirm</button>
    </div>
  );
}
