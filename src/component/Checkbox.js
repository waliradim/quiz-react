import React from "react";

export default function Checkbox({ className, text, ...rest }) {
  return (
    <label className={className}>
      {console.log("checkbox component")}
      <input type="checkbox" {...rest} /> <span>{text}</span>
    </label>
  );
}
