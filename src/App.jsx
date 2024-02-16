import { useState, useContext } from "react";
import "./App.css";
import Combat from "./components/Combat";
import CharacterSelect from "./components/CharacterSelect";
import { PlayerContextProvider } from "./context/playerContext";
import { EnemyContextProvider } from "./context/enemyContext";

function App() {
  const [activeComponent, setActiveComponent] = useState(2);

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
          <option value={1}>Character Select Screen</option>
          <option value={2}>Combat Screen</option>
        </select>
      </div>

      <PlayerContextProvider>
        <EnemyContextProvider>
          {activeComponent === 1 && <CharacterSelect />}
          {activeComponent === 2 && <Combat />}
        </EnemyContextProvider>
      </PlayerContextProvider>
    </>
  );
}

export default App;
