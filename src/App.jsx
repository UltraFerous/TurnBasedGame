import { useState } from "react";
import "./App.css";
import Combat from "./components/Combat";
import PlayerContext from "./context/playerContext";
import playerObj from "./db/playerData";
import EnemyContext from "./context/enemyContext";
import enemyObj from "./db/enemyData";

function App() {

  const [player, setPlayer] = useState(playerObj);
  const [enemy, setEnemy] = useState(enemyObj);

  const playerContext = {
    player,
    setPlayer,
  };

  const enemyContext = {
    enemy,
    setEnemy,
  };


  return (
    <>
      <PlayerContext.Provider value={playerContext}>
        <EnemyContext.Provider value={enemyContext}>
          <Combat />
        </EnemyContext.Provider>
      </PlayerContext.Provider>
    </>
  );
}

export default App;
