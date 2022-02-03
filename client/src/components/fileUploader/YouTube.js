import React, { useState } from 'react';
import ReactPlayer from 'react-player'
import './fileStyle.css';


function YouTube() {
  const [dataUrl, setDataUrl] = useState("")

  const getVideoDuration = () => {
    setDataUrl("https://www.youtube.com/watch?v=PusdZNYn-Ow")
  }

  const onDurationHandler = state => {
    console.log("Video Lenght is: " + state + " seconds")
    if(state <= 180) console.log("Video Lenght is VALID")
    else console.log("Video Lenght is INVALID")
  }

  return (
  <React.Fragment>
  <div className='container'>
    <div className='row'>
        <ReactPlayer
         url={dataUrl}
         className='video-hidden'
         width="100%"
         height="100%"
         controls={true}
         onDuration={onDurationHandler}
        />
    </div>
    </div>
        <div className='col-sm-3'>
            <button type="button" className="btn btn-info" onClick={getVideoDuration}>Get Video Duration</button>
        </div>
  </React.Fragment>
  )
}

export default YouTube;
