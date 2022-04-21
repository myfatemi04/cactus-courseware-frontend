import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, Divider, List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import {Module as ModuleType} from "../types";

export function ModuleTree({module, highlight = null, onClick, depth}: {
    module: ModuleType;
    highlight: number[] | null;
    onClick?: (path: number[]) => void;
    depth: number;
  }) {
    const highlighted = Array.isArray(highlight) && highlight.length === 0;
    const [opened, setOpened] = useState(false);
  
    const hasHighlightedChild = Array.isArray(highlight) && highlight.length > 0;
  
    useEffect(() => {
      setOpened(hasHighlightedChild);
    }, [hasHighlightedChild]);
  
    if (module.children.length === 0) {
      return (
        <ListItem
          button
          onClick={() => {
            onClick?.([]);
          }}
          sx={{ pl: 2 + depth * 2 }}
          style={{
            backgroundColor: highlighted ? "#eee" : "",
            color: opened ? "#000" : "",
          }}
        >
          <ListItemText primary={module.title} />
        </ListItem>
      );
    }
    return (
      <div>
        <ListItem
          button
          onClick={() => {
            onClick?.([]);
            setOpened((opened) => !opened);
          }}
          sx={{ pl: 2 + depth * 2 }}
          style={{
            backgroundColor: highlighted ? "#eee" : "",
            color: opened ? "#000" : "",
          }}
        >
          <ListItemText primary={module.title} />
          {opened ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Divider />
        <Collapse in={opened} timeout="auto" unmountOnExit>
          <List style={{ paddingTop: 0, paddingBottom: 0 }}>
            {module.children.map((submodule, index) => {
              return (
                <div key={submodule.title}>
                  <ModuleTree
                    module={submodule}
                    highlight={
                      highlight && highlight[0] === index
                        ? highlight.slice(1)
                        : null
                    }
                    onClick={(path) => {
                      onClick?.([index, ...path]);
                    }}
                    depth={depth + 1}
                  />
                </div>
              );
            })}
          </List>
        </Collapse>
      </div>
    );
}