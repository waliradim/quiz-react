import React from "react";
import classes from "../styles/Answer.module.css";
import Checkbox from "./Checkbox";
export default function Answer() {
  return (
    <div className={classes.answer}>
      <Checkbox className={classes.answer} text="Test Answer" />
    </div>
  );
}
