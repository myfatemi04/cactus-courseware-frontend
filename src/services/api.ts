import { Course } from "../types";

const API_BASE = "https://cacti-courseware.herokuapp.com"; //process.env.REACT_APP_API_URL;

export async function publishCourse(repoURL: string) {
  return await fetch(`${API_BASE}/course`, {
    body: JSON.stringify({ repo: repoURL }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export async function deleteCourse(repoURL: string) {
  return await fetch(`${API_BASE}/course`, {
    body: JSON.stringify({ repo: repoURL }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
}

export async function replaceCourse(repoURL: string) {
  deleteCourse(repoURL);
  return await publishCourse(repoURL);
}

export async function getCourse(id: string) {
  const res = await fetch(API_BASE + "/course/" + id);
  const json = await res.json();

  return json.course;
}

export async function getCourses(): Promise<Course[]> {
  const res = await fetch(API_BASE + "/course");
  const json = await res.json();

  return json.courses;
}
