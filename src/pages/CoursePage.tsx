import { Button, List } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CourseContext } from "../components/CourseContext";
import Module, { ModuleTree } from "../components/Module";
import getCourseContentAtPath from "../lib/getCourseContentAtPath";
import { getPreviousPath, getNextPath } from "../lib/pathutil";
import { getCourse } from "../services/api";
import { Course as CourseType } from "../types";

export default function CoursePage() {
  const [course, setCourse] = useState<CourseType | null>(null);
  const { id, path: urlPath } = useParams<{ id: string; path: string }>();

  const { path, setPath } = useContext(CourseContext);
  const content = course ? getCourseContentAtPath(course, path) : null;

  useEffect(() => {
    if (urlPath) {
      setPath(urlPath.split("-").map(Number));
    } else {
      setPath([]);
    }
  }, [setPath, urlPath]);

  useEffect(() => {
    // @ts-ignore
    if (typeof id === "string") {
      getCourse(id).then(setCourse);
    }
  }, [id]);

  const previousNextButtons = course && (
    <div style={{ display: "flex", marginLeft: "2rem" }}>
      <Button
        onClick={() =>
          setPath((path) => {
            return getPreviousPath(course.rootModule, path) || path;
          })
        }
      >
        Previous
      </Button>
      <Button
        onClick={() =>
          setPath((path) => {
            return getNextPath(course.rootModule, path) || path;
          })
        }
      >
        Next
      </Button>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        margin: "2rem",
        overflow: "auto",
      }}
    >
      <a
        style={{ fontSize: "4rem", cursor: "pointer" }}
        className="plain-link"
        href="/"
      >
        Cactus Courseware
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
            </div>
            <div style={{ width: "calc(100% * 6 / 7)", overflow: "auto" }}>
              {previousNextButtons}
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
