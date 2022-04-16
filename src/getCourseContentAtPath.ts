import { Course } from "./types";

export default function getCourseContentAtPath(
  courseContent: Course,
  path: number[]
) {
  // @ts-ignore
  return path.reduce((courseContent, pathPart) => {
    if (courseContent === null) {
      return null;
    }
    return courseContent.modules[pathPart];
  }, courseContent);
}
