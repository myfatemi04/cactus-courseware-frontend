import { Course as CourseType } from "../types";
import { ModuleTree } from "./ModuleTree";

export default function ModuleSidebar({
  path,
  setPath,
  course,
}: {
  path: number[];
  setPath: Function;
  course: CourseType;
}) {
  return (
    <div style={{ padding: "2rem" }}>
      <span
        style={{
          color: path.length === 0 ? "white" : "#ccc",
          cursor: "pointer",
        }}
        onClick={() => setPath([])}
      >
        Front Page
      </span>
      <div style={{ paddingLeft: "0.5rem", paddingTop: "0.25rem" }}>
        {course.rootModule.children.map((submodule, index) => {
          return (
            <div key={submodule.title}>
              <ModuleTree
                module={submodule}
                highlight={path[0] === index ? path.slice(1) : null}
                onClick={(path) => {
                  setPath([index, ...path]);
                }}
                depth={0}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
