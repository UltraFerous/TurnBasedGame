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

  const removeLatestEntry = () => {
    setLog((prevLog) => {
      const updatedLog = [...prevLog];
      updatedLog.pop(); // Remove the last entry
      return updatedLog;
    });
  };

  return { log, addLogEntry, clearLog, removeLatestEntry  };
};

export default useGameLog;
