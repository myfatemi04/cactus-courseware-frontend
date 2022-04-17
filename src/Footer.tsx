export function Footer() {
  return (
    <span
      style={{
        display: "block",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        color: "white",
        padding: "0.5rem",
        textAlign: "center",
      }}
    >
      Made by{" "}
      <a
        href="https://michaelfatemi.com/"
        className="plain-link"
        style={{ color: "white", textDecoration: "underline" }}
      >
        Michael Fatemi
      </a>
      ,{" "}
      <a
        href="https://arulandu.com/"
        className="plain-link"
        style={{ color: "white", textDecoration: "underline" }}
      >
        Caleb Arulandu
      </a>
      ,{" "}
      <a
        href="https://github.com/CyrilSharma"
        className="plain-link"
        style={{ color: "white", textDecoration: "underline" }}
      >
        Cyril Sharma
      </a>
      ,{" "}
      <a
        href="https://github.com/2022tgoel"
        className="plain-link"
        style={{ color: "white", textDecoration: "underline" }}
      >
        Tarushii Goel
      </a>
    </span>
  );
}
