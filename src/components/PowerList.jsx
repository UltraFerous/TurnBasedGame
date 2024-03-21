import React from "react";

const PowerList = ({ id, name, handlePowersOnClick }) => {
  return (
    <div>
      <button
        type="submit"
        onClick={() => {
          handlePowersOnClick(id);
        }}
      >
        {name}
      </button>
    </div>
  );
};

export default PowerList;
