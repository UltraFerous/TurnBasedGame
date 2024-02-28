import { React, useContext } from "react";
import PlayerContext from "../context/playerContext";
import heroDatabase from "../db/heroDatabase";

function EndGame() {
  const { player, setPlayer } = useContext(PlayerContext);

  return (
    <div>
      <div> Game Over! </div>
      <div> Your final score was {player.scores.points}. </div>
      <div> You made it to stage {player.scores.stage}! </div>
      <div> You had {player.scores.money} dollars! </div>
    </div>
  );
}

export default EndGame;
