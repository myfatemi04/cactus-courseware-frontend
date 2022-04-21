import { Button } from "@mui/material";
import { DiscussionEmbed } from "disqus-react";
import { useContext } from "react";
import {
  Course,
  Module as ModuleType,
} from "../types";
import { CourseContext } from "./CourseContext";
import JupyterNotebook from "./JupyterNotebook";
import { parseMarkdown } from "./parseMarkdown";

export default function Module({
  course,
  data,
}: {
  course: Course;
  data: ModuleType;
}) {
  const { setPath } = useContext(CourseContext);

  let parsed: any = null;
  try {
    if (data.type === "jupyter") {
      parsed = JSON.parse(data.content);
    }
  } catch (e) {
    parsed = null;
  }

  const noContent = (
    <>
      {data.children.length > 0 && (
        <>
          You can explore any of the following subunits:
          <br />
          {data.children.map((submodule, index) => {
            return (
              <div key={submodule.title}>
                <Button variant="text" onClick={() => setPath((path) => [...path, index])}>
                  {submodule.title}
                </Button>
              </div>
            );
          })}
        </>
      )}
    </>
  );

  return (
    <div
      style={{
        textAlign: "left",
        margin: "0 2rem",
        padding: "0.5rem",
        height: "60vh",
        overflow: "auto",
      }}
    >
      {data.type === "markdown" ? (
        data.content ? (
          parseMarkdown(data.content)
        ) : (
          <>
            <h2>The authors put no description here.</h2>
            {noContent}
          </>
        )
      ) : parsed ? (
        <JupyterNotebook notebook={parsed} />
      ) : (
        <>
          {/* <h2>Failed to parse.</h2> */}
          {noContent}
        </>
      )}
      <div style={{ marginTop: "5rem" }}>
        <DiscussionEmbed
          shortname="cactuscourseware"
          config={{
            url: window.location.href,
            identifier: data.id,
            title: data.title,
            language: "en_US",
          }}
        />
      </div>
    </div>
  );
}
