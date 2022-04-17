import { Course } from "../types";

const API_BASE = process.env.REACT_APP_API_URL;

export async function publishCourse(repo: string) {
  await fetch(API_BASE + "/course", {
    body: JSON.stringify({ repo }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export async function getCourses(): Promise<Course[]> {
  const res = await fetch(API_BASE + "/course");
  const json = await res.json();

  return json.courses;
}
