import React from "react";

const ItemHelper = ({ itemData }) => {
  if (typeof itemData === "undefined") {
    return <div>Welcome</div>;
  }
  if (itemData.type === 2) return <div>
    The {itemData.name} is a {itemData.type} weapon.
    
  </div>;

  if (itemData.type === 3) return <div>Armour</div>;

  if (itemData.type === 4) return <div>Stat Boost</div>;
};

export default ItemHelper;
