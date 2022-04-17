import { Divider } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CourseContext } from "../components/CourseContext";
import Module, { ModuleTree } from "../components/Module";
import getCourseContentAtPath from "../lib/getCourseContentAtPath";
import { getCourse } from "../services/api";
import { Course as CourseType } from "../types";

export default function CoursePage() {
  const [course, setCourse] = useState<CourseType | null>(null);
  const { id } = useParams<{ id: string }>();

  const { path, setPath } = useContext(CourseContext);
  const content = course ? getCourseContentAtPath(course, path) : null;

  useEffect(() => {
    // @ts-ignore
    if (typeof id === "string") {
      getCourse(id).then(setCourse);
    }
  }, [id]);

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
      <br />
      <Divider />
      <br />
      <div
        style={{
          width: "100%",
          display: "flex",
        }}
      >
        <div style={{ width: "calc(100% / 7)" }}>
          <ModuleTree
            module={course.rootModule}
            highlight={path}
            onClick={setPath}
            depth={0}
          />
        </div>
        <div style={{ width: "calc(100% * 6 / 7)", overflow: "auto" }}>
          {content ? (
            <Module data={content} course={course} />
          ) : (
            "Select a module"
          )}
        </div>
      </div>
    </div>
  );
}
