import React, { useRef, useState } from "react";
import classes from "../styles/Progressbar.module.css";
import Button from "./Button";

export default function Progressbar({ next, previous, progress, submit }) {
  const [toolTip, setToolTip] = useState(false);
  const tooltipRef = useRef();

  function toggolTooltip() {
    if (toolTip) {
      setToolTip(false);
      tooltipRef.current.style.display = "none";
    } else {
      setToolTip(true);
      tooltipRef.current.style.left = `calc(${progress}% - 65px)`;
      tooltipRef.current.style.display = "block";
    }
  }
  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton} onClick={previous}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={tooltipRef}>
          {progress}% Complete!
        </div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: `${progress}%` }}
            onMouseOver={toggolTooltip}
            onMouseOut={toggolTooltip}
          ></div>
        </div>
      </div>

      <Button
        className={classes.next}
        onClick={progress === 100 ? submit : next}
      >
        {progress === 100 ? "submit" : "next"}
        {/* <span>Next Question</span> */}
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
}
