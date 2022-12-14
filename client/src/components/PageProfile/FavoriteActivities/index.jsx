import React, { useState } from "react";

function FavoriteActivities() {
  const [listPreferences, setListPreferences] = useState(["value"]);
  const [valueActivity, setValueActivity] = useState("");
  const handleChangeActivity = (e) => {
    setValueActivity(e.target.value);
  };
  const handleAddActivityUser = (e) => {
    e.preventDefault();
    if (
      !listPreferences.some(
        (activity) =>
          activity.toLocaleLowerCase() == valueActivity.toLocaleLowerCase()
      )
    ) {
      setListPreferences([...listPreferences, valueActivity]);
      setValueActivity("");
    }
  };
  const handleDeleteActivityUser = (name) => {
    const deleteActivity = listPreferences.filter(
      (activity) => activity !== name
    );
    setListPreferences(deleteActivity);
  };

  return (
    <section>
      <div className="flex">
        <div className="w-1/3">
          <label htmlFor="underline_select" className="sr-only">
            Underline select
          </label>
          <select
            id="underline_select"
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-amber-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-amber-300 peer"
            defaultValue={valueActivity}
            onChange={handleChangeActivity}
          >
            <option defaultValue={"default"}>Selected</option>
            <option value="Programacion"> Programacion</option>
            <option value="Marketing">Marketing</option>
            <option value="Recruting">Recruting</option>
            <option value="Deportes">Deportes</option>
            <option value="Viajar">Viajar</option>
            <option value="Reunirse con amigo">Reunirse con amigos</option>
            <option value="Estudiar">Estudiar</option>
            <option value="Bailar">Bailar</option>
          </select>
        </div>
        <div className="w-2/3 mb-6">
          <form className="flex items-center " onSubmit={handleAddActivityUser}>
            <label htmlFor="simple-search" className="sr-only">
              Write
            </label>
            <div className="relative w-full">
              <input
                type="text"
                autoComplete="off"
                id="simple-search"
                className="block py-2.5 px-0 w-full text-sm text-gray-500 pl-5 bg-transparent border-0 border-b-2 border-l-2 border-amber-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-amber-300 peer placeholder:text-zinc-500"
                placeholder="Write..."
                value={valueActivity}
                onChange={handleChangeActivity}
                required
              />
            </div>
            <button
              type="submit"
              className="p-2 ml-2 text-sm font-medium text-white bg-amber-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600  dark:focus:ring-blue-800"
            >
              <i className="bi bi-plus-lg text-black"></i>
            </button>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 ">
        {listPreferences.length &&
          listPreferences.map((select) => (
            <button
              key={select}
              className="relative bg-amber-300 p-4  overflow-hidden text-sm font-medium text-gray-900 rounded-lg cursor-default "
            >
              <span className=" px-5 py-2.5 text-black  ">{select}</span>
              <i
                onClick={() => handleDeleteActivityUser(select)}
                className="bi bi-x-lg absolute top-0 right-0 m-1 mr-2"
              ></i>
            </button>
          ))}
      </div>
    </section>
  );
}

export default FavoriteActivities;
