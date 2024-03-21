import React from "react";

const ItemList = ({ id, name, amount, handleItemsOnClick }) => {
  return (
    <div>
      <button
        type="submit"
        onClick={() => {
          handleItemsOnClick(id);
        }}
      >
        {name}
      </button>
    </div>
  );
};

export default ItemList;
