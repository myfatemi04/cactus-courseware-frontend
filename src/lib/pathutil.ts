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

export function getPreviousPath(
  rootModule: Module,
  path: number[]
): number[] | null {
  // Returns either null or a path to the next module
  // null if there is no path to the next module
  if (path.length === 0) {
    return null;
  }

  if (path[0] === 0) {
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
      return [path[0] - 1];
    }
  }

  return null;
}
