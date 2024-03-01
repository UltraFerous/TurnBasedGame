import { React } from "react";
import useGameLog from "../hooks/useGameLog";
import "../styles/GameLog.scss";

function GameLog() {
  const { log } = useGameLog();
  return (
    <div className="logEntry">
      {log.map((entry, index) => {
        return (
          <div key={index} className="logWords">
            {" "}
            {entry}{" "}
          </div>
        );
      })}
    </div>
  );
}

export default GameLog;
