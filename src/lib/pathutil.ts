import { Module } from "../types";

export function getNextPath(
  rootModule: Module,
  path: number[]
): number[] | null {
  // Returns either null or a path to the next module
  // null if there is no path to the next module
  if (path.length === 0) {
    if (rootModule.children.length === 0) {
      return null;
    }
    return [0];
  }

  const nextPathForSubmodule = getNextPath(
    rootModule.children[path[0]],
    path.slice(1)
  );
  if (nextPathForSubmodule !== null) {
    return [path[0], ...nextPathForSubmodule];
  } else {
    if (path[0] + 1 < rootModule.children.length) {
      return [path[0] + 1];
    }
  }

  return null;
}

export function getPathToLastItem(module: Module) {
  const path = [];
  let currentModule = module;
  while (currentModule.children.length > 0) {
    path.push(currentModule.children.length - 1);
    currentModule = currentModule.children[currentModule.children.length - 1];
  }
  return path;
}

export function getPreviousPath(
  rootModule: Module,
  path: number[]
): number[] | null {
  console.log(rootModule, path);

  // Returns either null or a path to the previous module
  // null if there is no path to the previous module
  if (path.length === 0) {
    return null;
  }

  if (path.length === 1 && path[0] === 0) {
    return [];
  }

  const previousPathForSubmodule = getPreviousPath(
    rootModule.children[path[0]],
    path.slice(1)
  );
  if (previousPathForSubmodule !== null) {
    return [path[0], ...previousPathForSubmodule];
  } else {
    if (path[0] - 1 >= 0) {
      // Find the last module within that module
      return [
        path[0] - 1,
        ...getPathToLastItem(rootModule.children[path[0] - 1]),
      ];
    }
  }

  return null;
}
