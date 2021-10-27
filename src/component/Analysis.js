import React from "react";
import Questions from "./Question";

export default function Analysis({ answers }) {
  return (
    <>
      <h1>Question Analysis</h1>
      {console.log("analysis component")}
      <Questions answers={answers} />
    </>
  );
}
