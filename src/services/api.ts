import { Course } from "../types";

const API_BASE = process.env.REACT_APP_API_URL; //"https://cacti-courseware.herokuapp.com";

export async function publishCourse(repoURL: string) {
  return await fetch(`${API_BASE}/course`, {
    body: JSON.stringify({ repo: repoURL }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export async function deleteCourse(id: string) {
  return await fetch(`${API_BASE}/course/` + id, {
    method: "DELETE",
  });
}

export async function replaceCourse(course: Course) {
  console.log(course.id)
  const res = await deleteCourse(course.id);
  console.log("res");
  return await publishCourse(course.repoUrl);
}

export async function getCourse(id: string) {
  const res = await fetch(API_BASE + "/course/" + id);
  const json = await res.json();
  return json.course;
}

export async function findCourseFromUrl(url: string) {
  const res = await fetch(API_BASE + "/course/url/", {
      body: JSON.stringify({ repo: url }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  const json = await res.json();
  return json.course;
}

export async function getCourses(): Promise<Course[]> {
  const res = await fetch(API_BASE + "/course");
  const json = await res.json();
  return json.courses;
}
