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
  course: Course
}

export function CourseTile(props: propsType) {
  const {courses, setCourses} = React.useContext(CourseContext)
  let newCourses: string[] = [];
  if (!courses.includes(props.course.title)) {
    newCourses = [...courses]
    newCourses.push(props.course.title)
  }
  else {
    newCourses = [...courses]
  }

  return <div onClick={() => setCourses(newCourses)} style={tileItemStyle}> {props.course.title} </div>;
}
