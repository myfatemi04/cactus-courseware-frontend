const API_BASE = process.env.REACT_APP_API_URL;

export async function publishCourse(repoURL: string) {
  await fetch(`${API_BASE}/course`, {
    body: JSON.stringify({ repo: repoURL }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}
