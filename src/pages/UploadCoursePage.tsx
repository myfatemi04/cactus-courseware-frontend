import { Button, CircularProgress, TextField } from "@mui/material";
import { useState, useCallback, KeyboardEventHandler } from "react";
import { publishCourse } from "../services/api";
import { FetchStatus } from "../types";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import bgImg from '../assets/bg.png';

const Toggle = ({status}: { status: FetchStatus }) => {
  let item = null; 
  switch(status) {
    case 'idle':
      item = <ChevronRightIcon style={{margin: 'auto 0', fontSize: '2rem'}} color='warning'/>
      break;
    case 'pending':
      item = <CircularProgress color='warning' style={{margin: 'auto 1rem auto 0'}} size='2rem'/>
      break;
    case 'success':
      item =  <CheckIcon style={{margin: 'auto 0', fontSize: '2rem'}} color='warning'/>
      break;
    case 'error':
      item =  <ClearIcon style={{margin: 'auto 0', fontSize: '2rem'}} color='warning'/>
      break;
  }

  return item;
}

export default function UploadCoursePage() {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("idle");
  const [urlInput, setUrlInput] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const publish = useCallback(async () => {
    const ghUrlInd = urlInput.indexOf("https://github.com/");
    const processedUrl = !ghUrlInd
      ? urlInput
      : urlInput.substring(ghUrlInd + 1);
    setUrlInput(processedUrl);
    
    setFetchStatus('pending')
    const res = await publishCourse(processedUrl);
    const body = await res.json();
    if(res.ok){
      setFetchStatus('success')
    } else {
      if(body.error === 'Course already uploaded') setErrorMsg('This course has already been added.')
      setFetchStatus('error')
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
    <div className="relative h-screen" style={{backgroundImage: `url(${bgImg})`}}>
      <div className="absolute left-8 bottom-8">
        <h1 className="mb-4 text-white text-7xl font-bold">Upload a GitHub Repo</h1>
        <p className="mb-8 text-white text-3xl font-light">See our example repository for a easy-to-use, detailed <b className="font-bold">specification</b></p>
        
        <div className="relative w-full h-full">
          <input
            type="text"
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyUp={onKeyUp}
            className="mb-8 text-white text-6xl font-light border-white border-b-2 bg-transparent"
          />
          <button className="w-12 h-12 " onClick={() => publish()}><Toggle status={fetchStatus}/></button>
          {errorMsg.length > 0 ? <p className="absolute bottom-0 text-coral">{errorMsg}</p> : null}
        </div>

      </div>
    </div>
  );
}
