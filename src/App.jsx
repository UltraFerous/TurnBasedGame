import { useState, useContext } from "react";
import "./App.scss";
import Combat from "./components/Combat";
import CharacterSelect from "./components/CharacterSelect";
import TitleScreen from "./components/TitleScreen";
import ItemShop from "./components/ItemShop";
import EndGame from "./components/EndGame";
import { PlayerContextProvider } from "./context/playerContext";
import { EnemyContextProvider } from "./context/enemyContext";
import useGameLog from "./hooks/useGameLog";

function App() {
  const [activeComponent, setActiveComponent] = useState(3);
  const { log, addLogEntry, clearLog, removeLatestEntry  } = useGameLog();

  const handleSelectChange = (e) => {
    setActiveComponent(Number(e.target.value));
  };

  return (
    <>
      <div>
        Select state:
        <select
          id="dropdown"
          value={activeComponent}
          onChange={handleSelectChange}
        >
          <option value={1}>Title Screen</option>
          <option value={2}>Character Select Screen</option>
          <option value={3}>Combat Screen</option>
          <option value={4}>The Shop</option>
          <option value={5}>End Game</option>
        </select>
      </div>

      <PlayerContextProvider>
        <EnemyContextProvider>
          {activeComponent === 1 && <TitleScreen />}
          {activeComponent === 2 && <CharacterSelect />}
          {activeComponent === 3 && (
            <Combat
              log={log}
              addLogEntry={addLogEntry}
              clearLog={clearLog}
              removeLatestEntry={removeLatestEntry}
            />
          )}
          {activeComponent === 4 && (
            <ItemShop log={log} addLogEntry={addLogEntry} clearLog={clearLog} />
          )}
          {activeComponent === 5 && <EndGame />}
        </EnemyContextProvider>
      </PlayerContextProvider>
    </>
  );
}

export default App;
