import TextField from "@mui/material/TextField";
import React, { useEffect, useMemo, useState } from "react";
import { CourseTile } from "../components/CourseTile";
import TileGrid from "../components/TileGrid";
import { getCourses } from "../services/api";
import { Course } from "../types";

export default function MainPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    getCourses().then((courses) => setCourses(courses));
  }, []);

  const tiles = useMemo(() => {
    return courses
      .filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((course, index) => (
        <CourseTile course={course} key={index}></CourseTile>
      ));
  }, [courses, searchQuery]);

  return (
    <div
      style={{
        padding: "2rem 4rem",
        height: "100vh",
        color: "white",
        backgroundImage: "url(/Background_Image.png)",
      }}
    >
      <h1 style={{ fontSize: "4rem" }}>Learn something new today.</h1>
      <h3>I want to learn...</h3>
      <input
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          fontSize: "3rem",
          fontWeight: "lighter",
          width: "100%",
          color: "white",
          backgroundColor: "transparent",
          borderLeft: "none",
          borderRight: "none",
          borderTop: "none",
          borderBottom: "1px solid white",
        }}
      />
      <TileGrid tiles={tiles} />
    </div>
  );
}
