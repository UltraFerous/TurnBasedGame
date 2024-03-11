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

  useEffect(() => {
    console.log("Component mounted");
    return () => {
      console.log("Component will unmount");
    };
  }, []);

  return { log, addLogEntry, clearLog };
};

export default useGameLog;
