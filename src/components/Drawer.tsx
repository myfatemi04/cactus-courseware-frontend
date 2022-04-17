import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Tree } from "../types";
// import { CourseContext } from "./CourseContext";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

// computer science course
// list of sections
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
        key={item.title}
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
        sx={{ pl: props.depth * 2 + 2 }}
      >
        <ListItemText primary={props.title} />
        {openCollapse ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openCollapse} timeout="auto" unmountOnExit>
        <List>{sections}</List>
      </Collapse>
    </div>
  );
}

export default function PersistentDrawerLeft(props: { name: string }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let sections: ReactNode[] = [];
  for (let item of outline) {
    sections.push(
      <ExpandableListItem
        key={item.title}
        title={item.title}
        childs={item.children}
        depth={0}
      ></ExpandableListItem>
    );
  }
  // const { courses } = React.useContext(CourseContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {props.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Search", "Upload"].map((text, index) => (
            <ListItem button key={text} component={Link} to={"/" + text}>
              <ListItemIcon>
                {index % 2 === 0 ? <SearchIcon /> : <CloudUploadIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>{sections.map((item) => item)}</List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
