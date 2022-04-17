import { Course, Module } from "../types";

export default function getCourseContentAtPath(course: Course, path: number[]) {
  // @ts-ignore
  return path.reduce((module, pathPart) => {
    if (module === null) {
      return null;
    }
    return module.children[pathPart];
  }, course.rootModule) as Module;
}
