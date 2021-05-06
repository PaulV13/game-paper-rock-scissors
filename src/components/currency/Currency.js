import React from "react";

import "./Currency.css";

function Currency({ name = "", className, pick }) {
  const handleClick = () => {
    pick({ name, className });
  };

  return (
    <div className={className} onClick={handleClick}>
      <div className="box">
        <img src={`./images/icon-${name}.svg`} alt="" />
      </div>
    </div>
  );
}

export default Currency;
