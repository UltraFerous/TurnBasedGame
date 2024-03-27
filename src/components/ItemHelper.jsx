import React from "react";

const ItemHelper = ({ itemData }) => {
  if (typeof itemData === "undefined") {
    return <div>Welcome</div>;
  }
  if (itemData.type === 2)
    return (
      <div className="shopKeeperTip">
        <ul>
          <li>
            The {itemData.name} {itemData.name[itemData.name.length - 1] === 's' ? 'are' : 'is'} a {itemData.stats.skill.type} weapon.
          </li>
          <li>Skill rating {itemData.stats.skill.value}</li>
          <li>Bonus Strength {itemData.stats.weaponStrength}</li>
          <li>Armour piercing {itemData.stats.rend}</li>
          <li>Damage {itemData.stats.damage}</li>
          <li> {itemData.stats.attacks} attacks</li>
        </ul>
      </div>
    );

  if (itemData.type === 3) return <div>Armour</div>;

  if (itemData.type === 4) return <div>Stat Boost</div>;
};

export default ItemHelper;
