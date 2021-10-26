import React from "react";
import classes from "../styles/Progressbar.module.css";
import Button from "./Button";
export default function Progressbar({ next, previous, progress, submit }) {
  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton} onClick={previous}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip}>{progress}% Cimplete!</div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: `${progress}%` }}
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
