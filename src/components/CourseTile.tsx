import { useNavigate } from "react-router-dom";
import React from "react";
import { Course } from "../types";
import { CourseContext } from "./CourseContext";

const tileItemStyle = {
  width: "18rem",
  height: "16rem",
  border: "1px solid #ccc",
  margin: "1rem",
  display: "inline-block",
  borderRadius: "0.5rem",
  padding: "0.5rem",
};

interface propsType {
  course: Course;
}

export function CourseTile(props: propsType) {
  const { courses, setCourses } = React.useContext(CourseContext);
  let newCourses: Course[] = [];
  let navigate = useNavigate();

  let courseNames = newCourses.map((a) => a.title);
  if (!courseNames.includes(props.course.title)) {
    newCourses = [...courses];
    newCourses.push(props.course);
  } else {
    newCourses = [...courses];
  }
  console.log(newCourses);

  function onclick() {
    setCourses(newCourses);
    navigate("/courses/" + props.course.title);
  }
  return (
    <div onClick={() => onclick()} style={tileItemStyle}>
      {" "}
      {props.course.title}{" "}
    </div>
  );
}
