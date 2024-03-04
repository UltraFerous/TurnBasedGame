import { React, useState } from "react";
import "../styles/TitleScreen.scss";

function TitleScreen() {
  const [menu, setMenu] = useState(true);

  const handleButtonClick = function () {
    setMenu(!menu);
  };

  return (
    <div className="titleScreen">
      {menu === true && (
        <div>
          <h1>GAME NAME</h1>
          <button
            className="blinking-button"
            onClick={() => handleButtonClick()}
          >
            Click to Start
          </button>
        </div>
      )}
      {menu === false && (
        <div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <button
            className="blinking-button"
            onClick={() => handleButtonClick()}
          >
            Click to Start
          </button>
        </div>
      )}
    </div>
  );
}

export default TitleScreen;
