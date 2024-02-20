import { React, useContext } from "react";
import itemShopInventory from "../db/itemShopDatabase";
import { itemPurchase } from "../helpers/itemPurchase";
import PlayerContext from "../context/playerContext";

function ItemShop() {
  const { player, setPlayer } = useContext(PlayerContext);

  const handleItemPurchaseOnClick = function (index) {
    const updatedStats = itemPurchase(player, index);
    setPlayer(updatedStats);
  };

  return (
    <div>
      Welcome to the shop
      {itemShopInventory.map((item, index) => (
        <button
          key={item.id}
          onClick={() => {
            handleItemPurchaseOnClick(item.id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default ItemShop;
