import { useCallback, useState } from "react";
import "./App.css";
import { GithubFolderResponse } from "./types";

function App() {
  const [repo, setRepo] = useState("");
  const [data, setData] = useState<null | GithubFolderResponse>(null);

  const load = useCallback(() => {
    if (!repo.includes("/")) {
      return;
    }
    const [owner, name] = repo.split("/");
    fetch(`https://api.github.com/repos/${owner}/${name}/contents/`)
      .then((res) => res.json())
      .then(setData);
  }, [repo]);

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" onChange={(e) => setRepo(e.target.value)} />
        <button onClick={load}>Load course</button>
        {data ? (
          <>
            {data.map((item) => {
              return <div key={item.name}>{item.name}</div>;
            })}
          </>
        ) : (
          "No data"
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
