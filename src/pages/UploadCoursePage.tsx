import { Button, CircularProgress } from "@mui/material";
import { useState, useCallback, KeyboardEventHandler } from "react";
import { publishCourse, deleteCourse, replaceCourse } from "../services/api";
import { FetchStatus } from "../types";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import bgImg from '../assets/bg.png';
import "../styles/Popup.scss";

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

const Popup = (props: {handleClose: () => void, children: React.ReactNode}) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.children}
      </div>
    </div>
  );
};

export default function UploadCoursePage() {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("idle");
  const [popupOpen, setPopupOpen] = useState(false);
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
    const timer = await setTimeout(() => {}, 500);
    if(res.ok){
      setFetchStatus('success')
    } else {
      if(body.error === 'Course already uploaded') {
        setErrorMsg('This course has already been added.')
        setPopupOpen(true)
      }
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
          <button style={{width: '3rem', height: '3rem', cursor: 'pointer'}} onClick={() => publish()}><Toggle status={fetchStatus}/></button>
          {
            popupOpen ? 
            <Popup handleClose={() => setPopupOpen(!popupOpen)}>
              <p style={{marginBottom: '2rem', color: '#000000', fontSize: '1.875rem', fontWeight: 300}}> Replace your course? </p>
              <Button variant="contained" onClick={() => {setPopupOpen(!popupOpen); replaceCourse(urlInput); setFetchStatus("success");}}>Yes</Button>
            </Popup>
            : null
          }
        </div>

      </div>
    </div>
  );
}
