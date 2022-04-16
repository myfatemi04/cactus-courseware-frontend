import { Module, Tree } from "./types";

export default function moduleToTree(module: Module): Tree {
  return {
    name: module.title,
    children: module.modules.map(moduleToTree),
  };
}
