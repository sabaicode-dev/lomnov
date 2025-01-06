import React from "react";

function SelectLanguages() {
  return (
    <>
      <select
        name="lng"
        id="lng"
        className="border-[1px] px-3 py-2 rounded-md w-fit ml-5 "
      >
        <option value="en">English</option>
        <option value="km">Khmer</option>
      </select>
    </>
  );
}

export default SelectLanguages;
