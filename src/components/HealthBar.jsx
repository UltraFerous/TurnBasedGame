import React, { useState, useEffect } from "react";
import "../styles/HealthBar.scss";

const HealthBar = ({ currentHealth, maxHealth, targetEnemyName }) => {
  const [health, setHealth] = useState(currentHealth);

  const healthPercentage = (currentHealth / maxHealth) * 100;

  const onHealthChange = (newHealth) => {
    setHealth(newHealth);
  };

  useEffect(() => {
    onHealthChange(currentHealth);
  }, [currentHealth, maxHealth]);

  return (
    <div className="healthBarContainer">
      <div className="healthEnemyName">{targetEnemyName}</div>
      <div
        className="healthBar"
        style={{
          width: `${healthPercentage}%`,
        }}
      />
    </div>
  );
};

export default HealthBar;
