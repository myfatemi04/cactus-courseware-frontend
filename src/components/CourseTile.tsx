const tileItemStyle = {
  width: "18rem",
  height: "16rem",
  border: "1px solid #ccc",
  margin: "1rem",
  display: "inline-block",
  borderRadius: "0.5rem",
  padding: "0.5rem",
};

export function CourseTile({ children }: { children: string }) {
  return <div style={tileItemStyle}>{children}</div>;
}
