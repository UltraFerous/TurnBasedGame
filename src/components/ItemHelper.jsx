import React from "react";

const ItemHelper = ({ itemData }) => {
  if (itemData.type === 2) return <div>weapon</div>;

  if (itemData.type === 3) return <div>Armour</div>;

  if (itemData.type === 4) return <div>Stat Boost</div>;
};

export default ItemHelper;
