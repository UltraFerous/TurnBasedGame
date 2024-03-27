import React from "react";

const ItemHelper = ({ itemData }) => {
  if (typeof itemData === "undefined") {
    return <div>Welcome</div>;
  }
  if (itemData.type === 1)
    return (
      <div className="shopKeeperTip">
        <ul>
          The {itemData.name} will restore {itemData.heal} lost wounds.
        </ul>
      </div>
    );

  if (itemData.type === 2)
    return (
      <div className="shopKeeperTip">
        <ul>
          <li>
            The {itemData.name}{" "}
            {itemData.name[itemData.name.length - 1] === "s" ? "are" : "is"} a{" "}
            {itemData.stats.skill.type} weapon:
          </li>
          <li>Skill rating: {itemData.stats.skill.value}</li>
          <li>Bonus Strength: {itemData.stats.weaponStrength}</li>
          <li>Armour piercing: {itemData.stats.rend}</li>
          <li>Damage: {itemData.stats.damage}</li>
          <li>Attacks: {itemData.stats.attacks}</li>
        </ul>
      </div>
    );

  if (itemData.type === 3)
    return (
      <div className="shopKeeperTip">
        <ul>
          <li>The {itemData.name} is an armour piece:</li>
          <li>Armour Value: {itemData.stats.armour}</li>
          <li>Shield Save: {itemData.stats.shield}+</li>
        </ul>
      </div>
    );

  if (itemData.type === 4)
    return (
      <div className="shopKeeperTip">
        <ul>
          <li>
            The {itemData.name} will raise your {itemData.stat} stat by{" "}
            {itemData.amount}.{" "}
          </li>
        </ul>
      </div>
    );
};

export default ItemHelper;
