import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tree } from "../components/Module";
import moduleToTree from "../courseToTree";
import { Course as CourseType } from "../types";
import course from "../example_course.json";
import getCourseContentAtPath from "../getCourseContentAtPath";
import { parseCourseRepository } from "../loadGithubRepository";

export default function CoursePage() {
  // const [course, setCourse] = useState<CourseType | null>(null);
  const { user, repo } = useParams<{ user: string; repo: string }>();
  const [path, setPath] = useState<number[]>([]);
  const name = `${user}/${repo}`;

  const content = course ? getCourseContentAtPath(course, path) : null;

  // useEffect(() => {
  //   parseCourseRepository(name).then(setCourse);
  // }, [name]);

  return course ? (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "40rem",
        }}
      >
        <h1>{course.title}</h1>
        <em>{course.authors.join(", ")}</em>
        <br />
        <Tree
          tree={moduleToTree(course.rootModule)}
          highlight={path}
          onClick={setPath}
        />
      </div>
    </div>
  ) : (
    <>No course</>
  );
}
