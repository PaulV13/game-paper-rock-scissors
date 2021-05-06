import React from "react";

import "./Button.css";

function Button({ onClick, text, className }) {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
}

export default Button;
