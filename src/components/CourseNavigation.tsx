import { faCircle as faCircleHollow } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faCircle as faCircleFilled,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import getCourseContentAtPath from "../lib/getCourseContentAtPath";
import { getNextPath, getPreviousPath } from "../lib/pathutil";
import { Course } from "../types";
import { CourseContext } from "./CourseContext";
import ModuleSidebar from "./ModuleSidebar";

export default function CourseNavigation({ course }: { course: Course }) {
  const { path, setPath } = useContext(CourseContext);

  const [open, setOpen] = useState(false);

  const currentCourseContent = getCourseContentAtPath(course, path);

  const parentCourseContent = getCourseContentAtPath(
    course,
    path.slice(0, path.length - 1)
  );

  const previousNextButtons = course && (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FontAwesomeIcon
        icon={faAngleLeft}
        onClick={() =>
          setPath((path) => getPreviousPath(course.rootModule, path) || path)
        }
        style={{ margin: "0.5rem", cursor: "pointer" }}
      />
      {parentCourseContent &&
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
        onClick={() =>
          setPath((path) => getNextPath(course.rootModule, path) || path)
        }
        style={{ margin: "0.5rem", cursor: "pointer" }}
      />
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
        onClick={() => setOpen((open) => !open)}
      >
        {open ? (
          <>
            <span style={{ padding: "0.5rem" }}>Placeholder</span>
            <div
              style={{
                position: "absolute",
                backgroundColor: "black",
                maxHeight: "300px",
                overflowY: "auto",
                color: "white",
                padding: "0.5rem",
                zIndex: 1,
              }}
            >
              {currentCourseContent.title}{" "}
              <FontAwesomeIcon
                icon={faAngleUp}
                style={{ marginLeft: "0.5rem" }}
              />
              <ModuleSidebar course={course} path={path} setPath={setPath} />
            </div>
          </>
        ) : (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.5rem",
            }}
          >
            {currentCourseContent.title}
            <FontAwesomeIcon
              icon={faAngleDown}
              style={{ marginLeft: "0.5rem" }}
            />
          </span>
        )}
      </div>
      {previousNextButtons}
    </div>
  );
}
