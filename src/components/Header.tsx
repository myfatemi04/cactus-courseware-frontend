import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div style={{ textAlign: "center", margin: "1rem 0rem" }}>
      <h1>
        <Link to="/" className="plain-link">
          Cactus 🌵
        </Link>
      </h1>
    </div>
  );
}
