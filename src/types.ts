export interface Tree {
  name: string;
  children?: Tree[];
}

export type TreePath = string[];

export interface Module {
  name: string;
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
