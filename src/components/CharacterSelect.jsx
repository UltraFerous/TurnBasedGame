import { React, useContext } from "react";
import PlayerContext from "../context/playerContext";
import heroDatabase from "../db/heroDatabase";

function CharcterSelect() {
  const { player, setPlayer } = useContext(PlayerContext);

  const handleSelectChange = (event) => {
    const selectedIndex = parseInt(event.target.value, 10);
    console.log("Changed character to:", heroDatabase[selectedIndex]);
    setPlayer(heroDatabase[selectedIndex]);
  };

  return (
    <div>
      Pick Character...
      <select onChange={handleSelectChange}>
        {heroDatabase.map((hero, index) => (
          <option value={index} key={index}>
            {hero.information.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CharcterSelect;
