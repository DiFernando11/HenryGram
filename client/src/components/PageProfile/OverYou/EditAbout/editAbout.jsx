import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCheck2 } from "react-icons/bs";
import { editProfileAction } from "../../../../redux/actions/index";
import { useDispatch } from 'react-redux';

function EditAbout({ editAbout, setEditAbout, userId, currentAbout}) {

  const dispatch = useDispatch();
  const [about, setAbout] = useState(currentAbout);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProfileAction({
      description: about,
      id: userId
    }))
    setEditAbout(false);
  };

  const handleChange = (e) => {
    setAbout(e.target.value);
  };


  return (
    <form onSubmit={ handleSubmit }>
      <div className="w-full mb-4  border border-amber-300 bg-blacker  rounded-lg  dark:bg-gray-700 dark:border-gray-600">
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
            onChange={handleChange}
            value={about}
          >
          </textarea>
        </div>
        <div className="flex items-center bg-transparent justify-between px-3 py-2 ">
          <button type="submit" className="" >
            <BsCheck2 className=" text-lime-700" />
          </button>
          <button className="" onClick={() => setEditAbout(false)}>
            <RxCross1 className=" text-red-700" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditAbout;