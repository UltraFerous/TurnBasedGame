import { React, useContext, useState, useEffect } from "react";
import itemShopInventory from "../db/itemShopDatabase";
import { itemPurchase } from "../helpers/itemPurchase";
import PlayerContext from "../context/playerContext";
import "../styles/ItemShop.scss";

function ItemShop() {
  const { player, setPlayer } = useContext(PlayerContext);
  const [shop, setShop] = useState([]);

  const updateShop = function (shopIndex) {
    const tempShop = shop;
    tempShop.splice(shopIndex, 1);
    setShop(tempShop);
  };

  const handleItemPurchaseOnClick = function (itemID, tempShopIndex) {
    const statsAfterPurchase = itemPurchase(player, itemID);
    statsAfterPurchase.transaction && updateShop(tempShopIndex);
    setPlayer(statsAfterPurchase.updatedStats);
  };

  const populateShop = function () {
    const numberOfItems = 3;
    const itemsInShop = [itemShopInventory[0]];
    const minCeiled = Math.ceil(0);
    const maxFloored = Math.floor(itemShopInventory.length - 1);
    let randomNumber = 0;
    for (let i = 0; i < numberOfItems; i++) {
      randomNumber = Math.floor(
        Math.random() * (maxFloored - minCeiled + 1) + minCeiled
      );
      itemsInShop.push(itemShopInventory[randomNumber]);
    }
    return setShop(itemsInShop);
  };

  useEffect(() => {
    setShop([]);
    populateShop();
  }, []);

  return (
    <div>
      Welcome to the shop
      {shop.map((item, index) => (
        <div key={index}>
          {item.name}
          {item.cost}
          {item.description}
          <button
            onClick={() => {
              handleItemPurchaseOnClick(item.id, index);
            }}
          >
            Purchase
          </button>
        </div>
      ))}
    </div>
  );
}

export default ItemShop;
