import Box from "@mui/material/Box";
import React from "react";
import { DrawerContext } from "./components/DrawerContext";


export function Container(props: { children: React.ReactNode }) {
    const { open } = React.useContext(DrawerContext);
    return <Box sx={{marginLeft:`${open ? 240 : 0}px`, transition: `margin 100ms ease-in-out, box-shadow 100ms ease-in-out`}}> {props.children} </Box>
}