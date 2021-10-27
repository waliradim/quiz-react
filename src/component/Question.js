import React from "react";
import classes from "../styles/Question.module.css";
import Answer from "./Answer";
export default function Question({ answers = [] }) {
  return answers.map((answer, index) => (
    <div className={classes.question} key={index}>
      <div className={classes.qtitle}>
        <span className="material-icons-outlined"> help_outline </span>
        {answer.title}
        {console.log("question component")}
      </div>
      <Answer input={false} option={answer.options} />
    </div>
  ));
}
