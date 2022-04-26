import { faCircle as faCircleHollow } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleLeft,
  faAngleRight,
  faCircle as faCircleFilled,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import getCourseContentAtPath from "../lib/getCourseContentAtPath";
import { getNextPath, getPreviousPath } from "../lib/pathutil";
import { Course } from "../types";
import { CourseContext } from "./CourseContext";

export default function CourseNavigation({
  course,
  setSidebarOpen,
}: {
  course: Course;
  setSidebarOpen: Function;
}) {
  const { path, setPath } = useContext(CourseContext);

  const currentCourseContent = getCourseContentAtPath(course, path);

  const parentCourseContent = getCourseContentAtPath(
    course,
    path.slice(0, path.length - 1)
  );

  const prev = getPreviousPath(course.rootModule, path);
  const next = getNextPath(course.rootModule, path);
  const prevAvailable = prev && prev.length > 0;
  const nextAvailable = next != null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <FontAwesomeIcon
          icon={faAngleLeft}
          onClick={
            prevAvailable ? () => setPath((path) => prev || path) : undefined
          }
          style={{
            margin: "0.5rem",
            cursor: "pointer",
            color: prevAvailable ? "black" : "lightgrey",
          }}
        />
        <span
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.5rem",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => setSidebarOpen(true)}
        >
          {currentCourseContent.title}
        </span>
        {false &&
          parentCourseContent &&
          parentCourseContent.children.length > 1 &&
          parentCourseContent.children.map((child, idx) => (
            <FontAwesomeIcon
              style={{ margin: "0 0.125rem" }}
              icon={
                idx === path[path.length - 1] ? faCircleFilled : faCircleHollow
              }
            />
          ))}
        <FontAwesomeIcon
          icon={faAngleRight}
          onClick={
            nextAvailable ? () => setPath((path) => next || path) : undefined
          }
          style={{
            margin: "0.5rem",
            cursor: "pointer",
            color: nextAvailable ? "black" : "lightgrey",
          }}
        />
      </div>
    </div>
  );
}
