import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Module, { Tree as ModuleTree } from "../components/Module";
import { Course as CourseType } from "../types";
import getCourseContentAtPath from "../getCourseContentAtPath";
import { parseCourseRepository } from "../loadGithubRepository";
import { CourseContext } from "../components/CourseContext";

export default function CoursePage() {
  const [course, setCourse] = useState<CourseType | null>(null);
  const { user, repo } = useParams<{ user: string; repo: string }>();

  const { path, setPath } = useContext(CourseContext);

  const name = `${user}/${repo}`;

  const content = course ? getCourseContentAtPath(course, path) : null;

  useEffect(() => {
    parseCourseRepository(name).then(setCourse);
  }, [name]);

  if (!course) {
    return <>No course</>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        margin: "2rem",
      }}
    >
      <div>
        {/* Course title and route */}
        <h1>{course.title}</h1>
        <em>{course.authors.join(", ")}</em>
      </div>
      <div style={{ height: 1, backgroundColor: "black", margin: "2rem 0" }} />
      <div
        style={{
          width: "100vw",
          display: "flex",
        }}
      >
        <div style={{ flex: 1 }}>
          <ModuleTree
            module={course.rootModule}
            highlight={path}
            onClick={setPath}
          />
        </div>
        <div style={{ flex: 6 }}>
          {content ? <Module data={content} path="" /> : "Select a module"}
        </div>
      </div>
    </div>
  );
}
