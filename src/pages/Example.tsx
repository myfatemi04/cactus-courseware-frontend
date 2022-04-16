import { useParams } from "react-router-dom";

export default function Example() {
  const { courseId } = useParams<{ courseId: string }>();

  return <h2>{courseId}</h2>;
}
