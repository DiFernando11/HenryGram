import React, { useState } from "react";
import { Modal } from "flowbite-react";
import logoMatch from "../../../assets/coheteHenry.png";
function MakePost() {
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectTypePost, setSelectTypePost] = useState("");
  const [infoPost, setInfoPost] = useState({
    type: "",
    description: "",
    image: "",
  });
  const handleSelectTypePost = (type) => {
    setSelectTypePost(type);
    setShowAlert(true);
    setInfoPost({ ...infoPost, type });
  };
  const handleChangeDescriptionPost = (e) => {
    setInfoPost({ ...infoPost, description: e.target.value });
  };

  return (
    <React.Fragment>
      <i
        onClick={() => setShow(!show)}
        className="bi bi-plus-lg text-white mr-4 text-3xl cursor-pointer pr-9"
      ></i>

      <Modal
        show={show}
        size="lg"
        popup={true}
        onClose={() => setShow(!show)}
        className="bg-zinc-900"
      >
        <Modal.Header className="bg-black" />
        {selectTypePost.length && showAlert ? (
          <div className="p-5 relative bg-stone-600">
            <span className="text-xs text-white ">
              {selectTypePost === "Match"
                ? "Match : Create group chats with people who share your tastes,sports, work, from anywhere in the world."
                : "Normal: Tell the world about your accomplishments and concerns."}
            </span>
            <i
              className="bi bi-x-lg absolute bottom-0 right-0 pr-2 pb-2 text-yellow"
              onClick={() => setSelectTypePost(false)}
            ></i>
          </div>
        ) : null}

        <Modal.Body className="bg-black">
          <div className="space-y-6  px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <div className="flex flex-col w-2/4">
              <span className="text-center py-2">SELECT</span>
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  onClick={() => handleSelectTypePost("Match")}
                  type="button"
                  className={`inline-flex items-center py-2 px-4 text-white font-medium text-gray-900 bg-transparent rounded-l-lg border border-gray-900 hover:bg-amber-300  hover:text-black dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 
                ${
                  selectTypePost === "Match" &&
                  "z-10 ring-2 ring-amber-400 text-black bg-amber-300 font-semibold text-sm    "
                } dark:focus:bg-gray-700"`}
                >
                  <img
                    className="w-5 h-5 mr-2"
                    src={logoMatch}
                    alt="logo match"
                  />
                  Match
                </button>

                <button
                  onClick={() => handleSelectTypePost("Normal")}
                  type="button"
                  className={`inline-flex items-center py-2 px-4 text-white font-medium text-gray-900 bg-transparent rounded-r-md border border-gray-900 hover:bg-amber-300 hover:text-black ${
                    selectTypePost === "Normal" &&
                    "z-10 ring-2 ring-amber-400 text-black bg-amber-300 font-semibold text-sm "
                  }  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700`}
                >
                  Normal
                </button>
              </div>
            </div>
            <form>
              <div className="w-full mb-4 bg-transparent border border-amber-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className=" flex items-center justify-between px-3 py-2 border-b border-amber-300 dark:border-gray-600">
                  <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                    <div className="flex items-center space-x-1 sm:pr-4 ">
                      <button
                        type="button"
                        className="p-2 text-gray-500 rounded cursor-pointer  dark:text-gray-400"
                      >
                        <label htmlFor="file-input">
                          <i className="bi bi-image text-lg text-yellow"></i>
                        </label>
                        <input
                          id="file-input"
                          name="foto"
                          type="file"
                          className="hidden"
                        />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center space-x-1 sm:pl-4">
                      <span className="text-white text-xs uppercase ">
                        Post: {selectTypePost}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 bg-transparent  rounded-b-lg dark:bg-gray-800">
                  <label htmlFor="editor" className="sr-only">
                    Publish post
                  </label>
                  <textarea
                    id="editor"
                    rows="8"
                    className="block w-full px-0 text-sm h-24 text-white bg-transparent border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder={`${
                      selectTypePost === "Match"
                        ? "Matchea with people from all over the world..."
                        : "Tell people about your latest news..."
                    }`}
                    value={infoPost.description}
                    onChange={handleChangeDescriptionPost}
                    required
                  ></textarea>
                </div>
                <img
                  className="w-full h-44 object-cover"
                  src="https://static.eldiario.es/clip/71d118ff-5ef2-449c-be8a-6c321304fa70_16-9-aspect-ratio_default_0.jpg"
                  alt="post image"
                />
              </div>
              <button
                type="submit"
                className=" block m-auto px-5 py-2.5 text-sm font-medium text-center text-black font-semibold  bg-amber-300 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              >
                Publish post
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default MakePost;
