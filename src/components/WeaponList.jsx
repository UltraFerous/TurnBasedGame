import React from "react";

const WeaponList = ({name, handleWeaponsOnClick}) => {
  return (
    <div>
      <button
        type="submit"
        onClick={() => {
          handleWeaponsOnClick()
        }}
      >
        Attack with {name}
      </button>
    </div>
  );
};

export default WeaponList;
