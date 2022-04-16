import TextField from "@mui/material/TextField";
import React, { useMemo, useState } from "react";
import { CourseTile } from "../components/CourseTile";
import TileGrid from "../components/TileGrid";
import { Course } from "../types";

const courses: Course[] = [
  {
    title: "Introduction to Computer Science",
    markdown: "Learn the basics of computer science and programming.",
  } as Course,
  {
    title: "Introduction to Algorithms",
    markdown: "Learn the basics of algorithms and data structures.",
  } as Course,
];

export default function MainPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const tiles = useMemo(() => {
    return courses
      .filter((course) => course.title.toLowerCase().includes(searchQuery))
      .map((course, index) => <CourseTile course={course} key={index}></CourseTile>);
  }, [searchQuery]);

  return (
    <div className="App">
      <h1>Learn Anything</h1>
      <div style={{ width: "20rem", margin: "0.5rem 0" }}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          color="primary"
          fullWidth
          label="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <TileGrid tiles={tiles} />
    </div>
  );
}
