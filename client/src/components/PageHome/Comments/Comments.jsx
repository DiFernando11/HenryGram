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

  );
}

export default Comments;
