import { createContext, ReactNode, useState } from "react";

export const CourseContext = createContext({
  courses: new Array<string>(),
  setCourses: (c: string[]) => {},
});

export function CourseContextProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState(new Array<string>());

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
