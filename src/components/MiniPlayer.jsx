import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import classes from '../styles/Miniplayer.module.css';
// import image from '../assets/images/3.jpg';

export default function MiniPlayer({ title, videoID }) {
    // console.log(title);
  const buttonRef = useRef();
    const [status, setStatus] = useState(false);
    const videoUrl = `https://www.youtube.com/watch?v=${videoID}`;
function toggleMiniPlayer() {
      if (!status) {
        buttonRef.current.classList.remove(classes.floatingBtn);
        setStatus(true);
    } else {
        buttonRef.current.classList.add(classes.floatingBtn);
        setStatus(false);
    }
}
  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={buttonRef}
      onClick={toggleMiniPlayer}
    >
      <span className={`material-icons-outlined ${classes.open}`}>play_circle_filled</span>
      <span
        className={`material-icons-outlined ${classes.close}`}
        onClick={toggleMiniPlayer}
      >
        close
      </span>
      <ReactPlayer
        className={classes.player}
        url={videoUrl}
        width="300px"
        height="168px"
        playing={status}
        controls
      />
      {/* <img src={image} alt="All tag" /> */}
      <p>{title}</p>
    </div>
  );
}
