import React from "react";

import "./Currency.css";

function Currency({ name = "", color = "", shadow = "", pick, style }) {
  const handleClick = () => {
    pick({ name, color, shadow });
  };

  return (
    <div
      shadow={shadow}
      color={color}
      className="currency"
      style={style}
      onClick={handleClick}
    >
      <div className="box">
        <img src={`./images/icon-${name}.svg`} alt="" />
      </div>
    </div>
  );
}

export default Currency;
