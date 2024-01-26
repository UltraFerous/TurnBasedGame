import { useEffect } from "react";
import "./App.css";
import Combat from "./components/Combat";
import PlayerContext from "./context/playerContext";
import playerObj from "./db/playerData";

function App() {
  return (
    <>
      <PlayerContext.Provider value={playerObj}>
        <Combat />
      </PlayerContext.Provider>
    </>
  );
}

export default App;
