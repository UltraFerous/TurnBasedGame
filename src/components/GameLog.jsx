import { React, useState, useEffect } from "react";
import useGameLog from "../hooks/useGameLog";
import "../styles/GameLog.scss";

function GameLog(props) {
  // const { log, addLogEntry, clearLog } = useGameLog();

  return (
    <div className="logEntry">
      {props.log.map((entry, index) => {
        return (
          <div key={index} className="logWords">
            {entry}
          </div>
        );
      })}
    </div>
  );
}

export default GameLog;
