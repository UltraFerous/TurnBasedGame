import { React, useContext } from "react";
import PlayerContext from "../context/playerContext";
import "../styles/EndGame.scss";

function EndGame() {
  const { player, setPlayer } = useContext(PlayerContext);

  return (
    <div className="EndGameScreen">
      <h1> Game Over! </h1>
      <div> Your final score was {player.scores.points}. </div>
      <div> You made it to stage {player.scores.stage}! </div>
      <div> You had {player.scores.money} dollars! </div>
    </div>
  );
}

export default EndGame;
