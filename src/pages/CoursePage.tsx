import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CourseContext } from "../components/CourseContext";
import CourseNavigation from "../components/CourseNavigation";
import Module from "../components/Module";
import ModuleSidebar from "../components/ModuleSidebar";
import getCourseContentAtPath from "../lib/getCourseContentAtPath";
import { getCourse } from "../services/api";
import { Course as CourseType } from "../types";
import CourseFrontPage from "./CourseFrontPage";

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

  if (path.length === 0 && course) {
    return <CourseFrontPage course={course} />;
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        // padding: "2rem",
        overflow: "auto",
      }}
    >
      {!course ? (
        <span>Loading...</span>
      ) : (
        <>
          <div
            style={{
              textAlign: "center",
              color: "#222",
              padding: "2rem",
            }}
          >
            {/* Course title and route */}
            <h1
              style={{
                fontFamily: "Josefin Sans",
                fontSize: "2rem",
                textAlign: "center",
                marginBottom: "0.25rem",
              }}
            >
              {course.title}
            </h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span style={{ marginRight: "1rem" }}>
                {course.authors.join(", ")}
              </span>
              <span>
                <a
                  href={`https://github.com/${course.repoUrl}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{
                    color: "inherit",
                  }}
                >
                  <FontAwesomeIcon icon={faCode} />
                </a>
              </span>
              <span style={{ marginLeft: "1rem" }}>
                <a
                  style={{
                    cursor: "pointer",
                  }}
                  className="plain-link"
                  href="/"
                >
                  Home
                </a>
              </span>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              height: "100%",
            }}
          >
            {/* Two columns */}
            <div style={{ width: "calc(100% / 7)", backgroundColor: "black" }}>
              <ModuleSidebar path={path} setPath={setPath} course={course} />
            </div>
            <div
              style={{
                width: "calc(100% * 6 / 7)",
                overflow: "auto",
                height: "100%",
                padding: "2rem",
              }}
            >
              <CourseNavigation course={course} />
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
