import React from "react";

function SearchBar() {
  return (
    <form className="flex items-center">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-8 pointer-events-none">
          <i className="bi bi-search text-white"></i>
        </div>
        <input
          type="text"
          id="simple-search"
          className="block w-11/12 p-2 pl-12 text-sm text-white border rounded-2xl  bg-zinc-900 border-amber-200 m-auto"
          placeholder="Search"
          required
        />
      </div>
    </form>
  );
}

export default SearchBar;
