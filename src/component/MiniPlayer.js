import React, { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import classes from "../styles/MiniPlayer.module.css";

export default function MiniPlayer({ id, title }) {
  const buttonRef = useRef();
  const [state, setstate] = useState(false);
  const videoUrl = `https://www.youtube.com/watch?v=${id}`;
  function toggoleMiniPlayer() {
    if (!state) {
      buttonRef.current.classList.remove(classes.floatingBtn);
      setstate(true);
    } else {
      buttonRef.current.classList.add(classes.floatingBtn);
      setstate(false);
    }
  }
  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={buttonRef}
      onClick={toggoleMiniPlayer}
    >
      <span className={`material-icons-outlined ${classes.open}`}>
        {" "}
        play_circle_filled{" "}
      </span>
      <span
        className={`material-icons-outlined ${classes.close}`}
        onClick={toggoleMiniPlayer}
      >
        {" "}
        close{" "}
      </span>
      <ReactPlayer
        className={classes.miniPlayer.player}
        url={videoUrl}
        width="300px"
        height="168px"
        playing={state}
        controls
      />
      <p>{title}</p>
    </div>
  );
}
