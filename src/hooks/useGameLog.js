// useGameLog.js
import { react, useState, useEffect } from "react";

const useGameLog = () => {
  const [log, setLog] = useState([]);

  const addLogEntry = (entry) => {
    setLog((prevLog) => prevLog.concat(entry.flat()));
  };

  const clearLog = () => {
    setLog([]);
  };

  return { log, addLogEntry, clearLog };
};

export default useGameLog;
