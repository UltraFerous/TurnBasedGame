import { react, createContext, useState } from "react";
import enemyObj from "../db/enemyData";

const EnemyContext = createContext();

export const EnemyContextProvider = ({ children }) => {
  const [enemy, setEnemy] = useState(enemyObj);

  const enemyContext = {
    enemy,
    setEnemy,
  };

  return (
    <EnemyContext.Provider value={enemyContext}>
      {children}
    </EnemyContext.Provider>
  );
};

export default EnemyContext;
