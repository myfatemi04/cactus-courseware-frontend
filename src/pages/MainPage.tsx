import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import TileGrid from "../components/TileGrid";

const courses = {};

export default function MainPage() {
  const [searchQuery, setSearchQuery] = useState("");

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
      <TileGrid />
    </div>
  );
}
