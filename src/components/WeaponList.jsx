import React from "react";

const WeaponList = ({id, name, handleWeaponsOnClick}) => {
  return (
    <div>
      <button
        type="submit"
        onClick={() => {
          handleWeaponsOnClick(id)
        }}
      >
        Attack with {name}
      </button>
    </div>
  );
};

export default WeaponList;
