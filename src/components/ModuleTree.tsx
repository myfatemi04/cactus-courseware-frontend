import { Module as ModuleType } from "../types";

export function ModuleTree({
  module,
  highlight = null,
  onClick,
  depth,
}: {
  module: ModuleType;
  highlight: number[] | null;
  onClick?: (path: number[]) => void;
  depth: number;
}) {
  const highlighted = Array.isArray(highlight) && highlight.length === 0;

  return (
    <div>
      <span
        style={{
          color: highlighted ? "white" : "#ccc",
          cursor: "pointer",
        }}
        onClick={() => onClick?.([])}
      >
        {module.title}
      </span>
      {module.children.length > 0 && (
        <div
          style={{
            paddingLeft: "0.5rem",
            paddingTop: "0.25rem",
            paddingBottom: "0.25rem",
          }}
        >
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
                  depth={0}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
