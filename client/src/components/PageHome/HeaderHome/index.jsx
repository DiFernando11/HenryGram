import React from "react";
import SearchBar from "../../SearchBar";

function HeaderHome() {
  return (
    <div className=" w-full bg-stone-800 h-16 flex items-center justify-between ">
      <div className="w-6/12">
        <SearchBar />
      </div>
      <i className="bi bi-plus-lg text-white mr-4 text-2xl cursor-pointer"></i>
    </div>
  );
}

export default HeaderHome;
