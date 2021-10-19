import React from "react";
import illustrationImage from "../assets/images/signup.svg";
import classes from "../styles/Illustration.module.css";
export default function Illustration() {
  return (
    <div className={classes.illustration}>
      <img src={illustrationImage} alt="Signup" />
    </div>
  );
}
