import { Button, CircularProgress, TextField } from "@mui/material";
import { upload } from "@testing-library/user-event/dist/upload";
import { useState, useCallback, KeyboardEventHandler } from "react";
import { publishCourse } from "../services/api";
import { FetchStatus } from "../types";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const UploadFeedback = ({status}: { status: FetchStatus }) => {
  let item = null; 
  switch(status) {
    case 'pending':
      item = <CircularProgress color='warning' style={{margin: 'auto 1rem auto 0'}} size='2rem'/>
      break;
    case 'success':
      item =  <CheckIcon style={{margin: 'auto 1rem auto 0', fontSize: '2rem'}} color='warning'/>
      break;
    case 'error':
      item =  <ClearIcon style={{margin: 'auto 1rem auto 0', fontSize: '2rem'}} color='warning'/>
      break;
  }

  return item;
}

export default function UploadCoursePage() {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("idle");
  const [urlInput, setUrlInput] = useState<string>("");

  const publish = useCallback(async () => {
    const ghUrlInd = urlInput.indexOf('https://github.com/');
    const processedUrl = !ghUrlInd ? urlInput : urlInput.substring(ghUrlInd+1);
    setUrlInput(processedUrl);
    
    setFetchStatus('pending')
    const res = await publishCourse(processedUrl);
    if(res.ok){
      setFetchStatus('success')
    } else {
      setFetchStatus('error')
    }
  }, [urlInput])

  const onKeyUp: KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
    if (e.key === "Enter") {
      publish();
    }
  }, [publish]);

  return (
    <div style={{margin: 'auto 3rem'}}>
      <div style={{display: 'flex'}}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          color="primary"
          label="Search"
          placeholder="user-name/repo-name"
          value={urlInput}
          onKeyUp={onKeyUp}
          onChange={(e)=>setUrlInput(e.target.value)}
          style={{width: '36rem', height: '100%', padding: 0}}
        />

        <Button 
          variant="contained"
          onClick={() => publish()}
          style={{marginLeft: '1rem'}}
        ><UploadFeedback status={fetchStatus}/> Publish</Button>
      </div>
      
    </div>
  );
}
