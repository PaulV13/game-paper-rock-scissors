import React from "react";

import "./Button.css";

function Button({ onClick, text, className }) {
  return (
    <div onClick={onClick} style={{ textAlign: "center" }}>
      <button className={className}>{text}</button>
    </div>
  );
}

export default Button;
