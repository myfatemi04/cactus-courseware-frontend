import { Button, TextField } from "@mui/material";
import { KeyboardEventHandler, useCallback, useState } from "react";
import { publishCourse } from "../services/api";
import { FetchStatus } from "../types";

export default function UploadCoursePage() {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("idle");
  const [urlInput, setUrlInput] = useState<string>("");

  const publish = useCallback(async () => {
    const ghUrlInd = urlInput.indexOf("https://github.com/");
    const processedUrl = !ghUrlInd
      ? urlInput
      : urlInput.substring(ghUrlInd + 1);
    setUrlInput(processedUrl);

    setFetchStatus("pending");
    try {
      const data = await publishCourse(processedUrl);
      console.log(data);
      setFetchStatus("success");
    } catch {
      setFetchStatus("error");
    }
  }, [urlInput]);

  const onKeyUp: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key === "Enter") {
        publish();
      }
    },
    [publish]
  );

  return (
    <div style={{ margin: "auto 3rem" }}>
      <div style={{ display: "flex" }}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          color="primary"
          fullWidth
          label="Search"
          placeholder="user-name/repo-name"
          value={urlInput}
          onKeyUp={onKeyUp}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={() => publish()}
          style={{ marginLeft: "1rem" }}
        >
          Publish
        </Button>
      </div>
      {fetchStatus}
    </div>
  );
}
