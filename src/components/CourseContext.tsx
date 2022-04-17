import { createContext, ReactNode, useState } from "react";
import { Course } from "../types";

export type CourseContextType = {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  selectedCourse: string | null;
  path: number[];
  setPath: (p: number[]) => void;
};

export const CourseContext = createContext<CourseContextType>({
  courses: [],
  setCourses: (c: Course[]) => {},
  selectedCourse: null,
  path: [],
  setPath: (p: number[]) => {},
});

export function CourseContextProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState(new Array<Course>());
  const [path, setPath] = useState<number[]>([]);

  return (
    <CourseContext.Provider
      value={{
        courses,
        setCourses,
        selectedCourse: null,
        path,
        setPath,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}
