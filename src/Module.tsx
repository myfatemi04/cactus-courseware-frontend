import React from "react";
import ReactMarkdown from "react-markdown";
import { Module as ModuleType, Tree as TreeType } from "./types";

export const exampleModule: ModuleType = {
  name: "Example Module",
  markdown: `
# Machine Learning Tutorial

Get started with ML!
`,
  modules: [],
};

export function Tree({ tree }: { tree: TreeType }) {
  return (
    <>
      {tree.name}
      <ul>
        {tree.children?.map((subtree) => (
          <li>
            <Tree tree={subtree} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Module({
  data,
  tree,
  path,
}: {
  data: ModuleType;
  tree: TreeType;
  path: string;
}) {
  return (
    <div className="App">
      <div
        style={{
          textAlign: "left",
          border: "1px solid white",
          padding: "0.5rem",
        }}
      >
        <Tree tree={tree} />
      </div>
      <h1>{data.name}</h1>
      <div
        style={{
          textAlign: "left",
          minWidth: "40rem",
          margin: "2rem",
          padding: "0.5rem",
          border: "1px solid white",
        }}
      >
        <ReactMarkdown>{data.markdown}</ReactMarkdown>
      </div>
    </div>
  );
}
