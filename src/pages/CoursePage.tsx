import { List } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CourseContext } from "../components/CourseContext";
import Module, { ModuleTree } from "../components/Module";
import getCourseContentAtPath from "../lib/getCourseContentAtPath";
import { getCourse } from "../services/api";
import { Course as CourseType } from "../types";

export default function CoursePage() {
  const [course, setCourse] = useState<CourseType | null>(null);
  const { id, path: urlPath } = useParams<{ id: string; path: string }>();

  const { path, setPath } = useContext(CourseContext);
  const content = course ? getCourseContentAtPath(course, path) : null;

  useEffect(() => {
    setPath((urlPath || "").split("-").map(Number));
  }, [setPath, urlPath]);

  useEffect(() => {
    // @ts-ignore
    if (typeof id === "string") {
      getCourse(id).then(setCourse);
    }
  }, [id]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        margin: "2rem",
      }}
    >
      <a
        style={{ fontSize: "4rem", cursor: "pointer" }}
        className="plain-link"
        href="/"
      >
        Cacti Courseware
      </a>
      {!course ? (
        <span>Loading...</span>
      ) : (
        <>
          <div>
            {/* Course title and route */}
            <h1 style={{ fontSize: "3rem" }}>{course.title}</h1>
            <em>{course.authors.join(", ")}</em>
          </div>
          <div
            style={{
              height: "2px",
              width: "100%",
              backgroundColor: "black",
              margin: "1rem 0",
            }}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
            }}
          >
            <div style={{ width: "calc(100% / 7)" }}>
              <List style={{ paddingTop: 0, paddingBottom: 0 }}>
                {course.rootModule.children.map((submodule, index) => {
                  return (
                    <div key={submodule.title}>
                      <ModuleTree
                        module={submodule}
                        highlight={path[0] === index ? path.slice(1) : null}
                        onClick={(path) => {
                          setPath([index, ...path]);
                        }}
                        depth={0}
                      />
                    </div>
                  );
                })}
              </List>
              {/* <ModuleTree
            module={course.rootModule}
            highlight={path}
            onClick={setPath}
            depth={0}
          /> */}
            </div>
            <div style={{ width: "calc(100% * 6 / 7)", overflow: "auto" }}>
              {content ? (
                <Module data={content} course={course} />
              ) : (
                "Select a module"
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
