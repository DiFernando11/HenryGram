import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postComment } from "../../../redux/actions";
function Comments({ postId, handleSendCommentFront }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userInformation);
  const [comment, setComment] = useState({
    postId: "",
    userId: "",
    description: "",
  });

  const handleChange = (e) => {
    setComment({
      postId: postId,
      userId: userId?._id,
      description: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postComment(comment));
    setComment({
      ...comment,
      description: "",
    });
    handleSendCommentFront(comment.description);
  };

  return (
    <form onSubmit={handleSubmit}>
 
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only "
      >
        Search
      </label>

      <div className="relative bg-dark">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none bg-dark">
          <img
            className="w-8 h-8 rounded-full border border-amber-300 object-cover bg-dark"
            src={userId?.avatar}
            alt="avatar user"
          />
        </div>
        <input
          type="text"
          id="search"
          name="description"
          value={comment.description}
          placeholder="Comment..."
          onChange={handleChange}
          className="block w-full p-4 pl-16 text-sm text-white rounded-lg bg-black"
          required
          autoComplete="off"
        />

        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2 "
        >
          <i className="bi bi-send-fill text-yellow"></i>
        </button>
      </div>
    </form>
    //     <form>
    //     <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    //     <div class="relative">
    //         <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    //             <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
    //         </div>
    //         <input type="search" id="search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required>
    //         <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    //     </div>
    // </form>
  );
}

export default Comments;
