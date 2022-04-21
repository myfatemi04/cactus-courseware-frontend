import { Button, List, ListItem, ListItemText } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CourseContext } from "../components/CourseContext";
import Module, { ModuleTree } from "../components/Module";
import getCourseContentAtPath from "../lib/getCourseContentAtPath";
import { getPreviousPath, getNextPath } from "../lib/pathutil";
import { getCourse } from "../services/api";
import { Course as CourseType } from "../types";
import bgImg from "../assets/bg.png";
import logoImg from "../assets/logo.png";

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
          setPath((path) => getPreviousPath(course.rootModule, path) || path)
        }
      >
        Previous
      </Button>
      <Button
        onClick={() =>
          setPath((path) => getNextPath(course.rootModule, path) || path)
        }
      >
        Next
      </Button>
    </div>
  );

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        padding: "2rem",
        overflow: "auto",
      }}
    >
      <img
        src={bgImg}
        alt="bg"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          opacity: "15%",
          zIndex: -1,
        }}
      />

      <a
        style={{ fontSize: "4rem", cursor: "pointer", width: "fit-content" }}
        className="plain-link"
        href="/"
      >
        <img
          src={logoImg}
          alt="cactus"
          style={{ width: "3rem", height: "3rem" }}
        />
      </a>
      {!course ? (
        <span>Loading...</span>
      ) : (
        <>
          <div>
            {/* Course title and route */}
            <h1 style={{ fontSize: "3rem" }}>{course.title}</h1>
            <em>{course.authors.join(", ")}</em>
            <br />
            <span>
              View this course on Github:{" "}
              <a
                href={"https://github.com/" + course.repoUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                {course.repoUrl}
              </a>
            </span>
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
                <ListItem
                  button
                  onClick={() => setPath([])}
                  style={{
                    color: path.length === 0 ? "#000" : "",
                    backgroundColor: path.length === 0 ? "#eee" : "",
                  }}
                >
                  <ListItemText
                    style={{
                      marginLeft: "-0.75rem",
                    }}
                  >
                    Front Page
                  </ListItemText>
                </ListItem>
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
