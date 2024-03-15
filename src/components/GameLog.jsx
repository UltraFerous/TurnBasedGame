import { React, useState, useEffect } from "react";
import useGameLog from "../hooks/useGameLog";
import "../styles/GameLog.scss";

function GameLog(props) {
  return (
    <div>
      <div className="logEntry">
        {props.log.map((entry, index) => {
          return (
            <div key={index} className="logWords">
              {entry}
            </div>
          );
        })}
      </div>
      <button onClick={() => props.clearLog()} className="clearLogButton">clear</button>
    </div>
  );
}

export default GameLog;
