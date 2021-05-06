import React from "react";

import "./Rules.css";

export default function Rules({ onClick, className }) {
  return (
    <div className={className}>
      <h2>RULES</h2>
      <img className="img-rules" src="./images/image-rules.svg" alt="" />
      <img
        className="img-close"
        src="./images/icon-close.svg"
        alt=""
        onClick={onClick}
      />
    </div>
  );
}
