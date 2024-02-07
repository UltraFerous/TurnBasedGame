import React from "react";

const ItemList = ({ id, name, amount, handleItemsOnClick }) => {
  return (
    <div>
      {amount > 0 && (
        <button
          type="submit"
          onClick={() => {
            handleItemsOnClick(id);
          }}
        >
          Uses {name}
        </button>
      )}
    </div>
  );
};

export default ItemList;
