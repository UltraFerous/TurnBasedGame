import { useState } from "react";


function Combat() {

  const [turn, setTurn] = useState(0)

  const turnManager = function(){
    if(turn === 0){
      return setTurn(1);
    }
    return setTurn(0);
  }

  return (
    <div>
      <div>
        It is turn: {turn}
      </div>
      <button type="submit" onClick={turnManager} >
        Change Turn 
      </button>
    </div>
  );
}

export default Combat;
