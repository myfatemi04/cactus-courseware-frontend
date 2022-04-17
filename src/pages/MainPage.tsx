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
      .filter((course) => course.title.toLowerCase().includes(searchQuery))
      .map((course, index) => (
        <CourseTile course={course} key={index}></CourseTile>
      ));
  }, [courses, searchQuery]);

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
