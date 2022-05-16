import { faClose, faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { CourseContext } from "../components/CourseContext";
import CourseNavigation from "../components/CourseNavigation";
import Header from "../components/Header";
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

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (sidebarRef.current && sidebarOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target as Node)
        ) {
          setSidebarOpen(false);
        }
      };
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [sidebarOpen]);

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
        position: "relative",
        overflow: "auto",
      }}
    >
      <Header />
      {!course ? (
        <span>Loading...</span>
      ) : (
        <>
          {/* Course metadata */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#222",
            }}
          >
            {/* Course title and route */}
            <a href={"/courses/" + course.id} className="plain-link">
              <h1
                style={{
                  fontFamily: "Josefin Sans",
                  fontSize: "2rem",
                  textAlign: "center",
                  marginBottom: "0.25rem",
                  width: "fit-content",
                }}
              >
                {course.title}
              </h1>
            </a>
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
          {/* Page body */}
          <div
            style={{
              display: "flex",
              position: "relative",
              overflowY: "auto",
            }}
          >
            {/* Two columns */}
            {/* Sidebar */}
            <div
              className="sidebar-container"
              style={{
                width: sidebarOpen ? "400px" : 0,
                backgroundColor: "black",
                overflow: "hidden",
                position: "absolute",
                height: "100%",
                userSelect: "none",
                WebkitUserSelect: "none",
                bottom: 0,
                zIndex: 2,
              }}
              ref={sidebarRef}
            >
              {/* The width gets set to something huge because it's covered by the container */}
              <div style={{ width: "400px", padding: "2rem" }}>
                <span
                  style={{
                    color: "white",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setSidebarOpen(false)}
                >
                  Close
                  <FontAwesomeIcon
                    icon={faClose}
                    style={{ color: "white", marginLeft: "0.5rem" }}
                    onClick={() => setSidebarOpen(false)}
                  />
                </span>
                <ModuleSidebar
                  path={path}
                  setPath={(path: number[]) => {
                    setPath(path);
                    setSidebarOpen(false);
                  }}
                  course={course}
                />
              </div>
            </div>
            {/* Content */}
            <div
              style={{
                width: "1200px",
                margin: "0 auto",
                overflow: "auto",
                padding: "0 2rem",
              }}
            >
              <div
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "white",
                }}
              >
                <CourseNavigation
                  course={course}
                  setSidebarOpen={setSidebarOpen}
                />
              </div>
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
