import React, { useEffect, useMemo, useState } from "react";
import { CourseTile } from "../components/CourseTile";
import { getCourses } from "../services/api";
import { Course } from "../types";
import bgImg from "../assets/bg.png";

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
        padding: "4rem 4rem",
        height: "100vh",
        color: "white",
        backgroundSize: "cover",
        backgroundImage: `url(${bgImg})`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ margin: "0 1rem", overflow: "visible" }}>
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: 700,
            color: "#F5EED6",
            width: "100%",
            textAlign: "left",
          }}
        >
          Learn something.{" "}
          <a href="/upload" style={{ color: "#DBA933" }}>
            Create
          </a>{" "}
          something.
        </h1>
        <h3
          style={{
            marginTop: "1rem",
            fontSize: "1.875rem",
            fontWeight: 700,
            color: "#F5EED6",
          }}
        >
          I want to learn...
        </h3>
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
        <br />
      </div>
      <div
        style={{
          marginTop: '6rem',
          textAlign: "left",
          maxHeight: "100%",
          overflowY: "auto",
        }}
      >
        {tiles}
      </div>
    </div>
  );
}
