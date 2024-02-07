import { react, createContext, useState } from "react";
import playerObj from "../db/playerData";

const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
  const [player, setPlayer] = useState(playerObj);

  const playerContext = {
    player,
    setPlayer,
  };

  return (
    <PlayerContext.Provider value={playerContext}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;
