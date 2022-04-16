import React from "react";
import data from "../assets/ListData.json";

function List() {
  return (
    <ul style={{ textAlign: "left" }}>
      {data.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

export default List;
