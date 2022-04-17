export interface Course {
  // id: string;
  title: string;
  markdown: string;
  tags: string[];
  rootModule: Module;
  thumbnail: string;
  authors: string[];
}

export interface AnswerChoice {
  correct: boolean;
  text: string;
}

export type FetchStatus = "idle" | "pending" | "success" | "error";

export interface Question {
  text: string;
  type: "multiple" | "single";
  answers: AnswerChoice[];
  explanation: string;
}

export interface Tree {
  title: string;
  children: Tree[];
}

export type TreePath = string[];

export interface Module {
  title: string;
  markdown: string;
  modules: Module[];
}

export interface GithubFolderItem {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: "file" | "dir";
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

export type GithubFolderResponse = GithubFolderItem[];

export interface GithubFileResponse {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content: string;
  encoding: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}
