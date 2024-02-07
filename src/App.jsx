import { useState } from "react";
import "./App.css";
import Combat from "./components/Combat";
import { PlayerContextProvider } from "./context/playerContext";
import { EnemyContextProvider } from "./context/enemyContext";

function App() {
  return (
    <>
      <PlayerContextProvider>
        <EnemyContextProvider>
          <Combat />
        </EnemyContextProvider>
      </PlayerContextProvider>
    </>
  );
}

export default App;
