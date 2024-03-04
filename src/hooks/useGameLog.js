// useGameLog.js
import { useState } from "react";

const useGameLog = () => {
  const [log, setLog] = useState(["test1", "test2", "test3"]);

  const addLogEntry = (entry) => {
    setLog((prevLog) => [...prevLog, entry]);
  };

  const clearLog = () => {
    setLog([]);
  };

  return { log, addLogEntry, clearLog };
};

export default useGameLog;
