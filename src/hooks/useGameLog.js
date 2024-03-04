// useGameLog.js
import { useState } from "react";

const useGameLog = () => {
  const [log, setLog] = useState(['test', 'test', 'test']);

  const addLogEntry = (entry) => {
    setLog((prevLog) => [...prevLog, entry]);
  };

  const clearLog = () => {
    setLog([]);
  };

  return { log, addLogEntry, clearLog };
};

export default useGameLog;
