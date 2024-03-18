import { React, useContext, useState } from "react";
import PlayerContext from "../context/playerContext";
import "../styles/EndGame.scss";

function EndGame() {
  const { player, setPlayer } = useContext(PlayerContext);
  const [screen, setScreen] = useState(0);

  const changeScreen = function () {
    screen === 0 ? setScreen(1) : setScreen(0);
  };

  if (screen === 0) {
    return (
      <div className="EndGameScreen">
        <button onClick={() => changeScreen()}> Change </button>
        <h1> Game Over! </h1>
        <div> Your final score was {player.scores.points}. </div>
        <div> You made it to stage {player.scores.stage}! </div>
        <div> You had {player.scores.money} dollars! </div>
      </div>
    );
  }

  if (screen === 1) {
    return (
      <div className="EndGameScreen">
        <button onClick={() => changeScreen()}> Change </button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
    );
  }
}

export default EndGame;
