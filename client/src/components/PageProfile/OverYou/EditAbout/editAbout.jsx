import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCheck2 } from "react-icons/bs";
import {
  editProfileAction,
  refreshUpdateProfile,
} from "../../../../redux/actions/index";
import { useDispatch } from "react-redux";

function EditAbout({ editAbout, setEditAbout, userId, currentAbout }) {
  const dispatch = useDispatch();
  const [about, setAbout] = useState(currentAbout);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editProfileAction({
        description: about,
        id: userId,
      })
    );
    setEditAbout(false);
    setTimeout(() => dispatch(refreshUpdateProfile()), 500);
  };

  const handleChange = (e) => {
    setAbout(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="h-full">
      <div className="w-full h-full flex flex-col justify-between  rounded-lg">
        <div className=" bg-transparent rounded-t-lg dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Descripcion
          </label>
          <textarea
            id="comment"
            rows="4"
            className="w-full h-full px-0 text-sm bg-transparent border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Describe quien eres y que te gusta..."
            required
            onChange={handleChange}
            value={about}
          ></textarea>
        </div>
        <div className="flex items-center bg-transparent justify-between px-3 py-2 ">
          <button type="submit" className="">
            <BsCheck2 className=" text-lime-700 w-10 h-10" />
          </button>
          <button className="" onClick={() => setEditAbout(false)}>
            <RxCross1 className=" text-red-500 w-10 h-10" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditAbout;
