import { CircularProgress } from "@mui/material";
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
    <div style={{position: 'relative', height: '100vh', backgroundSize: 'cover', backgroundImage: `url(${bgImg})`}}>
      <div style={{position: 'absolute', left: '2rem', bottom: '2rem'}}>
        <h1 style={{marginBottom: '1rem', color: '#F5EED6', fontSize: '4.5rem', fontWeight: 700}} >Upload a GitHub Repo</h1>
        <p style={{marginBottom: '2rem', color: '#F5EED6', fontSize: '1.875rem', fontWeight: 300}}>
          See our example repository for a easy-to-use, detailed <b style={{fontWeight: 700}}>specification</b>
        </p>
        
        <div>
          <input
            type="text"
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyUp={onKeyUp}
            style={{
              marginBottom: '2rem',
              color: '#F5EED6',
              fontSize: '3.75rem',
              fontWeight: 'lighter',
              borderBottom: '2px solid #F5EED6',
              borderLeft: "none",
              borderRight: "none",
              borderTop: "none",
              background: 'transparent'
            }}
          />
          <button style={{width: '3rem', height: '3rem'}} onClick={() => publish()}><Toggle status={fetchStatus}/></button>
          {
            errorMsg.length > 0 ? 
            <p style={{position: 'absolute', bottom: 0, color: '#BA5A31'}}>{errorMsg}</p> 
            : null
          }
        </div>

      </div>
    </div>
  );
}
