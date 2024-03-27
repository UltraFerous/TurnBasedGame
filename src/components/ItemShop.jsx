import { React, useContext, useState, useEffect } from "react";
import itemShopInventory from "../db/itemShopDatabase";
import { itemPurchase } from "../helpers/itemPurchase";
import PlayerContext from "../context/playerContext";
import GameLog from "./GameLog";
import "../styles/ItemShop.scss";
import ItemHelper from "./ItemHelper";

function ItemShop({ log, addLogEntry, clearLog, removeLatestEntry }) {
  const { player, setPlayer } = useContext(PlayerContext);
  const [shop, setShop] = useState([]);
  const [ itemData, setItemData ] = useState();

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
    const numberOfItems = 4; //4
    const itemsInShop = [itemShopInventory[0]];
    const minCeiled = Math.ceil(0);
    const maxFloored = Math.floor(itemShopInventory.length - 1);
    const costChecker = true;
    let randomNumber = 0;
    while (itemsInShop.length < numberOfItems) {
      randomNumber = Math.floor(
        Math.random() * (maxFloored - minCeiled + 1) + minCeiled
      );
      if (
        costChecker &&
        itemShopInventory[randomNumber].cost <= player.scores.money
      ) {
        itemsInShop.push(itemShopInventory[randomNumber]);
      }
    }
    return setShop(itemsInShop);
  };

  useEffect(() => {
    setShop([]);
    populateShop();
    removeLatestEntry();
    addLogEntry([
      "Welcome, your doign great work outthere! I have authority to give you equipment from our arensal to aid you!",
    ]);
  }, []);

  return (
    <div className="itemScreen">
      <div className="gameLog">
        <GameLog log={log} clearLog={clearLog} />
      </div>
      <div className="itemShop">
        <div className="itemCards">
          {shop.map((item, index) => (
            <div
              key={index}
              className="itemCard"
              onMouseEnter={() => setItemData(item)}
              // onMouseLeave={() => setItemData()}
            >
              <div> {item.name} </div>
              <div> ¤{item.cost}.00 </div>
              <div> {item.description} </div>
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
        <div className="shopKeeper">
        <ItemHelper itemData={itemData} className="shopKeeperTip"/>
        <div className="shopKeeperImage"> Welcome to the shop </div>
        </div>
      </div>
    </div>
  );
}

export default ItemShop;
