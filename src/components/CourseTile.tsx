import { useNavigate } from "react-router-dom";
import React from "react";
import { Course } from "../types";
import { CourseContext } from "./CourseContext";
import { Typography } from "@mui/material";

export function CourseTile({ course }: { course: Course }) {
  const { courses, setCourses } = React.useContext(CourseContext);
  let newCourses: Course[] = [];
  let navigate = useNavigate();

  let courseNames = newCourses.map((a) => a.title);
  if (!courseNames.includes(course.title)) {
    newCourses = [...courses, course];
  } else {
    newCourses = [...courses];
  }

  function onClick() {
    setCourses(newCourses);
    navigate("/courses/" + course.id);
  }
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        width: "18rem",
        height: "16rem",
        border: "1px solid #ccc",
        margin: "1rem",
        display: "inline-block",
        borderRadius: "0.5rem",
        backgroundImage: `url(${course.thumbnail})`,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "white",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 1)",
          padding: "1rem",
        }}
      >
        <Typography variant="h6" textTransform="uppercase" fontWeight="bold">
          {course.title}
        </Typography>
      </div>
    </div>
  );
}
