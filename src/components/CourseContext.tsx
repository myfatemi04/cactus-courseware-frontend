import { createContext, ReactNode, useState } from "react";
import { Course } from "../types";

export const CourseContext = createContext({
  courses: new Array<Course>(),
  setCourses: (c: Course[]) => {},
});

export function CourseContextProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState(new Array<Course>());

  return (
    <CourseContext.Provider
      value={{
        courses,
        setCourses,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}
