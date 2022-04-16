import { ReactNode } from "react";

export default function TileGrid({ tiles }: { tiles: ReactNode[] }) {
  return <div style={{ textAlign: "left", width: "60rem" }}>{tiles}</div>;
}
