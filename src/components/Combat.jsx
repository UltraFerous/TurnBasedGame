import { useContext, useState } from "react";
import rollXDice from "../helpers/diceRolls";
import PlayerContext from "../context/playerContext";

function Combat() {
  const [turn, setTurn] = useState(0)
  const [roll, setRoll] = useState(rollXDice(6))
  const player = useContext(PlayerContext);

  const turnManager = function(){
    setRoll(rollXDice(6))
    console.log(player)
    if(turn === 0){
      return setTurn(1);
    }
    return setTurn(0);
  }

  return (
    <div>
      <div>
        It is turn: {turn} and you rolled {roll}.
      </div>
      <button type="submit" onClick={turnManager} >
        Change Turn 
      </button>
    </div>
  );
}

export default Combat;
