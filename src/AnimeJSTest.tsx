import animate, { AnimeInstance } from "animejs";
import { useCallback, useState } from "react";

function createPathstring(
  minT: number,
  maxT: number,
  dt: number,
  generator: (x: number) => [number, number]
) {
  const pathString = [];
  for (let t = minT; t <= maxT; t += dt) {
    const [x, y] = generator(t);
    pathString.push(`${x},${y}`);
  }
  return "M " + pathString.join(" L"); //+ " Z";
}

const width = 300;
const height = 300;

const startPath = createPathstring(-150, 150, 0.1, (t) => [
  Math.cos((t * Math.PI * 2) / 150) * (width / 2) + width / 2,
  Math.sin(((t * Math.PI * 2) / 150) * 2) * (height / 2) + height / 2,
]);
const endPath = createPathstring(-150, 150, 0.1, (t) => [
  t + width / 2,
  Math.cos(t / 25) * (height / 2) + height / 2,
]);

export default function AnimeJSTest() {
  const [animation, setAnimation] = useState<AnimeInstance>();
  const runAnimation = useCallback(() => {
    if (!animation) {
      setAnimation(
        animate({
          targets: "#path",
          d: [{ value: endPath }],
          easing: "easeInOutQuad",
          duration: 2000,
        })
      );
    } else {
      animation.reverse();
      setAnimation(undefined);
    }
  }, [animation]);

  return (
    <div
      style={{
        margin: "2rem",
      }}
    >
      <h1>AnimeJS</h1>
      <svg
        style={{
          border: "1px solid #ccc",
          width: "300px",
          height: "300px",
          borderRadius: "0.25rem",
        }}
      >
        <g>
          <path
            fillOpacity={0}
            id="path"
            d={startPath}
            fill="none"
            stroke="black"
            strokeWidth="1"
          />
        </g>
      </svg>
      <br />
      <button
        onClick={runAnimation}
        style={{
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "0.25rem",
          cursor: "pointer",
          minWidth: "3rem",
        }}
      >
        Run
      </button>
    </div>
  );
}
