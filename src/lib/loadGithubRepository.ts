import {
  Course as CourseType,
  Module as ModuleType,
  GithubFileResponse,
  GithubFolderResponse,
} from "../types";

export async function getGithubFolderContent(
  repo: string,
  path: string
): Promise<GithubFolderResponse> {
  const url = `https://api.github.com/repos/${repo}/contents/${path}`;
  const response = await fetch(url, {
    headers: {
      Authorization: process.env.REACT_APP_AUTH!,
    },
  });
  const json = await response.json();
  return json;
}

export async function getGithubFileText(
  repo: string,
  path: string
): Promise<string> {
  const response = (await (
    await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      headers: {
        Authorization: process.env.REACT_APP_AUTH!,
      },
    })
  ).json()) as GithubFileResponse;

  const content = response.content.replace(/\n/g, "");
  const text = atob(content);

  return text;
}

export async function parseCourseMetadata(
  repo: string
): Promise<Omit<CourseType, "rootModule" | "id">> {
  let text: string;
  try {
    text = await getGithubFileText(repo, "ocw.json");
  } catch (e) {
    console.log(e);
    throw new Error("Could not find ocw.json");
  }

  const metadata = JSON.parse(text) as {
    title: string;
    tags: string[];
    thumbnail: string;
    authors: string[];
  };
  const markdown = await getGithubFileText(repo, "README.md");

  return {
    title: metadata.title,
    tags: metadata.tags,
    thumbnail: metadata.thumbnail,
    authors: metadata.authors,
    markdown,
  };
}

export async function parseUnitFile(
  repo: string,
  path: string
): Promise<Omit<ModuleType, "id">> {
  // Parses a file, such as "01_Strings.md"
  const fileName = path.slice(path.lastIndexOf("/") + 1);
  // const unitNumber = fileName.slice(0, fileName.indexOf("_"));
  const unitName = fileName
    .slice(fileName.indexOf("_") + 1)
    .replace(/_/g, " ")
    .replace(/\.md$/, "");
  const content = await getGithubFileText(repo, path);

  return {
    title: unitName,
    markdown: content,
    modules: [],
  };
}

export async function parseUnitDirectory(
  repo: string,
  path: string
): Promise<Omit<ModuleType, "id">> {
  const module: Omit<ModuleType, "id"> = {
    title: "",
    markdown: "",
    modules: [],
  };

  const folder = await getGithubFolderContent(repo, path);
  const folderName = path.slice(path.lastIndexOf("/") + 1);
  // const unitNumber = folderName.slice(0, folderName.indexOf("_"));
  const unitName = folderName
    .slice(folderName.indexOf("_") + 1)
    .replace(/_/g, " ");

  module.markdown = await getGithubFileText(repo, path + "/index.md");
  module.title = unitName;

  for (const file of folder.sort((a, b) => a.name.localeCompare(b.name))) {
    if (file.type === "dir") {
      // Unit Directories
      module.modules.push(await parseUnitDirectory(repo, file.path));
    } else if (file.type === "file") {
      // Unit Files
      if (file.name === "index.md") {
        module.markdown = await getGithubFileText(repo, file.path);
      } else {
        if (/\d+_/.test(file.name)) {
          module.modules.push(await parseUnitFile(repo, file.path));
        }
      }
    }
  }

  return module;
}

export async function parseCourseRepository(
  repo: string
): Promise<Omit<CourseType, "id">> {
  const metadata = await parseCourseMetadata(repo);
  const root = await parseUnitDirectory(repo, "content");
  const course: Omit<CourseType, "id"> = {
    ...metadata,
    rootModule: root,
  };

  return course;
}
