import React from "react";

import "./Button.css";

function Button({ onClick, name, style }) {
  return (
    <div onClick={onClick} style={{ textAlign: "center" }}>
      <button style={style}>{name}</button>
    </div>
  );
}

export default Button;
