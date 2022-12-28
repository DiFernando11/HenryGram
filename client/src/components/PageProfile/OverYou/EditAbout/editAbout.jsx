import React from "react";

function EditAbout() {

  

  return (
    <form>
      <div className="w-full mb-4  border border-amber-300  rounded-lg  dark:bg-gray-700 dark:border-gray-600">
        <div className="px-4 py-2 bg-transparent rounded-t-lg dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows="4"
            className="w-full px-0 text-sm text-white bg-transparent border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Describe who you are and what you like..."
            required
          ></textarea>
        </div>
        <div className="flex items-center bg-transparent justify-between px-3 py-2 border-t border-amber-300  dark:border-gray-600">
          <button
            type="submit"
            className="inline-flex text-black items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-amber-300 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            comment
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditAbout;