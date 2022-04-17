import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Course } from "../types";
import { CourseContext } from "./CourseContext";

export function CourseTile({ course }: { course: Course }) {
  const { courses, setCourses } = React.useContext(CourseContext);
  let newCourses = courses;
  let navigate = useNavigate();

  let courseNames = newCourses.map((a) => a.title);
  if (!courseNames.includes(course.title)) {
    newCourses = [...courses, course];
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
        width: "calc((100% - 6rem) / 3 )",
        height: "18rem",
        margin: "1rem",
        display: "inline-block",
        position: "relative",
        borderRadius: "0.5rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          cursor: "pointer",
          position: "absolute",
          left: 0,
          right: 0,
          height: "14rem",
          display: "inline-block",
          backgroundImage: `url(${course.thumbnail})`,
          backgroundColor: "white",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.25)",
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          padding: "1rem 0.5rem",
        }}
      >
        <Typography
          variant="h5"
          textTransform="uppercase"
          fontWeight="bold"
          color="white"
          textAlign="center"
        >
          {course.title}
        </Typography>
      </div>
    </div>
  );
}
