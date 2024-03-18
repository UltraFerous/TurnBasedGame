import { React, useContext, useState } from "react";
import PlayerContext from "../context/playerContext";
import heroDatabase from "../db/heroDatabase";
import "../styles/CharacterSelect.scss";

function CharcterSelect() {
  const { player, setPlayer } = useContext(PlayerContext);
  const [tempPlayer, setTempPlayer] = useState();

  const handleCharacterSelect = (event) => {
    console.log("Changed character to:", event);
    setTempPlayer(heroDatabase[event]);
  };

  const handleReadyCharacter = (event) => {
    console.log("Locked character to:", tempPlayer);
    setPlayer(tempPlayer);
  };

  return (
    <div className="CharacterSelectScreen">
      <div className="CharacterInformation">
        <div className="CharacterDescription"></div>
        <div className="CharacterImage">
          <button
            className="ReadyCharacterButton"
            onClick={() => handleReadyCharacter()}
          >
            READY
          </button>
        </div>
      </div>
      <div className="CharacterCards">
        {heroDatabase.map((hero, index) => (
          <button
            onClick={() => {
              handleCharacterSelect(index);
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
