import React, { useState, useEffect } from "react";

const ConsoleLogDisplay = () => {
  const [logs, setLogs] = useState([]);

  // Run this effect only once during component mounting
  // Don't render anything in production
  useEffect(() => {
    const originalConsoleLog = console.log;

    console.log = (...args) => {
      originalConsoleLog(...args);
      setLogs((prevLogs) => [...prevLogs, args.join(" ")]);
    };

    return () => {
      console.log = originalConsoleLog;
    };
  }, []); 

  return (
    <div>
      <h2>Console Logs:</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default ConsoleLogDisplay;
