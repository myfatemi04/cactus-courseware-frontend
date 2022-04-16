import React, { useState, useCallback, KeyboardEventHandler } from "react";
import { GithubFolderResponse } from "./types";
import PersistentDrawerLeft from "./Drawer"
import List from "./List"
import TextField from "@mui/material/TextField";

type FetchStatus = "idle" | "pending" | "success" | "error";

export default function MainPage() {
  const [data, setData] = useState<null | GithubFolderResponse>(null);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("idle");

  const load = useCallback((repo: string) => {
    if (!repo.includes("/")) {
      return;
    }
    const [owner, name] = repo.split("/");
    setFetchStatus("pending");
    fetch(`https://api.github.com/repos/${owner}/${name}/contents/`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setData(data);
          setFetchStatus("success");
        } else {
          console.log("Error: Received data", data);
          setFetchStatus("error");
        }
      })
      .catch(() => setFetchStatus("error"));
  }, []);

  const onKeyUp: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key === "Enter") {
        // @ts-ignore
        load(e.target.value);
      }
    },
    [load]
  );

  return (
    <div className="App">
      {PersistentDrawerLeft("Github Opencourseware")}
      <input
        type="text"
        className="big-input"
        onKeyUp={onKeyUp}
        style={{ maxWidth: "20rem" }}
      />
      {fetchStatus === "pending" ? (
        <div>Loading...</div>
      ) : fetchStatus === "error" ? (
        <div>Error</div>
      ) : null}
      {data ? (
        <>
          {data.map((item) => {
            return <div key={item.name}>{item.name}</div>;
          })}
        </>
      ) : (
        "No data"
      )}
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <h1>Search for a course</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      <List />
    </div>
  );
}
