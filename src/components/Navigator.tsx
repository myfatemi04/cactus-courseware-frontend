import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, CssBaseline, List, ListItem, ListItemText } from "@mui/material";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Tree } from "../types";
import { CourseContext } from "./CourseContext";

const outline: Tree[] = [
    {
      title: "Computer sci",
      children: [
        { title: "DP", children: [] },
        { title: "algos", children: [{ title: "hi", children: [] }] },
      ],
    },
  ];

function ExpandableListItem(props: {
    title: string;
    childs: Tree[];
    depth: number;
  }) {
    const [openCollapse, setOpenCollapse] = React.useState(false);
    let sections: ReactNode[] = [];
    for (let item of props.childs) {
      sections.push(
        <ExpandableListItem
          title={item["title"]}
          childs={item["children"]}
          depth={props.depth + 1}
        ></ExpandableListItem>
      );
    }
    function handleOpenSettings() {
      setOpenCollapse(!openCollapse);
    }
    return (
      <div>
        <ListItem
          button
          onClick={handleOpenSettings}
          sx={{ pl: props.depth * 2 }}
        >
        <ListItemText primary={props.title} />
          {openCollapse ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCollapse} timeout="auto" unmountOnExit>
          <List>
            {sections.map((item) => item)}
          </List>
        </Collapse>
      </div>
    );
  }

export default function Navigator() {
    let ctx;
    let sections: ReactNode[] = [];
    for (let item of outline) {
      sections.push(
        <ExpandableListItem
          title={item["title"]}
          childs={item["children"]}
          depth={0}
        ></ExpandableListItem>
      );
    }
    const { courses } = (ctx = React.useContext(CourseContext));
    console.log("These are the courses: ");
    console.log(courses, ctx);
  
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
          <List>
            {sections.map((item) => item)}
            {courses.map((course, index) => (
              <ListItem
                button
                key={course.title}
                component={Link}
                to={"/courses/" + course.title}
              >
                <ListItemText primary={course.title} />
              </ListItem>
            ))}
          </List>
      </Box>
    );
}