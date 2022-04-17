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
