import React from "react";
import logobody from "../styles/img/logobody.png";

function Header() {
  return (
    <div className="header-container">
      <div className="logo">
        <h1>
          <span className="txtA">Body</span>
          <span className="txtB">Measure</span>
        </h1>
        <img src={logobody} alt="logo" />
      </div>
    </div>
  );
}

export default Header;