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
    <div>
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
  );
}
