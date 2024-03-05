import { React, useContext } from "react";
import PlayerContext from "../context/playerContext";
import heroDatabase from "../db/heroDatabase";
import "../styles/CharacterSelect.scss";

function CharcterSelect() {
  const { player, setPlayer } = useContext(PlayerContext);

  const handleSelectChange = (event) => {
    const selectedIndex = event.target.value;
    console.log("Changed character to:", heroDatabase[selectedIndex]);
    setPlayer(heroDatabase[selectedIndex]);
  };

  return (
    <div className="CharacterSelectScreen">
      <div className="CharacterInformation">
        <div className="CharacterDescription"></div>
        <div className="CharacterImage"></div>
      </div>
      <div className="CharacterCards">
        {heroDatabase.map((hero, index) => (
          <button
            onClick={() => {
              handleSelectChange(index);
            }}
            value={index}
            key={index}
            className="CharacterCard"
          >
            {hero.information.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CharcterSelect;
