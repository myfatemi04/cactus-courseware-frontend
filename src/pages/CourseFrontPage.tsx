import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CourseContext } from "../components/CourseContext";
import CustomMarkdown from "../components/CustomMarkdown";
import Header from "../components/Header";
import { Course } from "../types";

export default function CourseFrontPage({ course }: { course: Course }) {
  const { setPath } = useContext(CourseContext);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
        textAlign: "left",
        overflow: "auto",
        padding: "0 1rem",
      }}
    >
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "2rem auto",
          width: "1200px",
        }}
      >
        <Link to="/" className="plain-link">
          <FontAwesomeIcon icon={faAngleLeft} />
          {"  "}Home
        </Link>
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: "normal",
            marginBottom: "2rem",
          }}
        >
          {course.title}
        </h1>
        <CustomMarkdown>{course.rootModule.content}</CustomMarkdown>
        <br />
        <h2>Chapters</h2>
        <div
          style={{
            flex: 2,
            width: "100%",
            overflowX: "auto",
            marginTop: "1rem",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {course.rootModule.children.map((child, idx) => {
            return (
              <div className="course-box" onClick={() => setPath([idx])}>
                <h3>{child.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
