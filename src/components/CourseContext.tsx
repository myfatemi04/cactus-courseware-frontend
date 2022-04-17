import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Course } from "../types";

export type CourseContextType = {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  selectedCourse: string | null;
  path: number[];
  setPath: Dispatch<SetStateAction<number[]>>;
};

export const CourseContext = createContext<CourseContextType>({
  courses: [],
  setCourses: (c: Course[]) => {},
  selectedCourse: null,
  path: [],
  setPath: () => [],
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
