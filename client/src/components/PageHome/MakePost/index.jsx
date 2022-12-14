import React, { useState } from 'react';
import { Modal } from 'flowbite-react';
import logoMatch from '../../../assets/coheteHenry.png';
import { uploadImage } from '../../helpers/uploadImage';
import { validatePost } from '../../helpers/validateForm';
import { useSelector, useDispatch } from 'react-redux';
import { cleanPostState, postUser } from '../../../redux/actions';
import { Transition } from '@headlessui/react';
import Swal from 'sweetalert2';

const giftUpload =
  "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921";

function MakePost() {
  const userID = useSelector((state) => state.userInformation);
  const post = useSelector((state) => state.postUser);
  const dispatch = useDispatch();
  const [imagePost, setImagePost] = useState([]);
  const [loadingPostImage, setLoadingPostImage] = useState(false);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [selectTypePost, setSelectTypePost] = useState("Normal");
  const [infoPost, setInfoPost] = useState({
    userId: "",
    isMatch: false,
    description: "",
    image: {},
  });
  const handleDeleteImageSend = (indexImage) => {
    const imageSend = imagePost.filter((image, index) => index !== indexImage);
    setImagePost(imageSend);
  };
  const handleSelectTypePost = (type, boolean) => {
    validatePost(infoPost, setDisabled);
    setSelectTypePost(type);
    setShowAlert(true);
    setInfoPost({ ...infoPost, isMatch: boolean });
  };
  const handleChangeDescriptionPost = (e) => {
    setInfoPost({
      ...infoPost,
      description: e.target.value,
      userId: userID._id,
    });
    validatePost({ description: e.target.value }, setDisabled);
  };

  const handleSavePostImage = async (e) => {
    await uploadImage(e, setLoadingPostImage, infoPost, null, setImagePost);
    validatePost(infoPost, setDisabled);
    // setInfoPost({ ...infoPost, image: imagePost });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "question",
      title: "Are you sure you would like to make this post?",
      confirmButtonText: "Yes",
      showDenyButton: true,
      denyButtonText: "No",
      background: "#1e1c1d",
      color: "#fafbfd",
      iconColor: "#fcd34d",
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(postUser(infoPost));
        Swal.fire({
          didOpen: () => {
            Swal.showLoading();
          },
          background: "#1e1c1d",
        });
      }
    });
  };
  const handleAlert = (info) => {
    if (info.description) {
      Swal.fire({
        icon: "success",
        iconColor: "#fcd34d",
        title: "Posted successfully.",
        background: "#1e1c1d",
        color: "#fafbfd",
      }).then((res) => {
        if (res.isConfirmed) {
          dispatch(cleanPostState());
          setShow(false);
          setInfoPost({
            userId: "",
            isMatch: false,
            description: "",
            image: {},
          });
          setImagePost("");
          setDisabled(true);
        }
      });
    }
  };
  return (
    <>
      <div
        className={`fixed w-10 h-10 flex items-center justify-center right-3 sm:hidden z-10 top-16 mt-2 bg-amber-300 rounded-full`}
      >
        <i
          onClick={() => setShow(!show)}
          className="bi bi-plus-lg text-black text-2xl cursor-pointer"
        ></i>
      </div>

      <div
        className={`justify-center items-center gap-3 mt-5 w-11/12 m-auto hidden sm:flex `}
      >
        <img
          className="rounded-full w-12 h-12"
          src={userID?.avatar}
          alt="avatar user"
        />
        <input
          type="search"
          id="search"
          className="block w-full p-3 pl-5 text-sm text-white border rounded-lg  bg-transparent border-amber-200 cursor-pointer"
          placeholder="Create publication..."
          autoComplete="off"
          onClick={() => setShow(!show)}
        />
      </div>


      {handleAlert(post)}
      <Transition
        appear
        show={show}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Modal
          show={show}
          size="2xl"
          popup={true}
          onClose={() => setShow(!show)}
          className="bg-zinc-900"
        >
          <div className="bg-black">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Modal.Header className="bg-black text-white" />
            </Transition.Child>

            {selectTypePost.length && showAlert ? (
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="p-3 relative bg-stone-600 h-16 flex items-center">
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
              </Transition.Child>
            ) : null}

            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Modal.Body className="bg-black">
                <div className="space-y-6  px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                  <div className="flex flex-col w-2/4">
                    <span className="text-center py-2">SELECT</span>
                    <div
                      className="inline-flex rounded-md shadow-sm"
                      role="group"
                    >
                      <button
                        onClick={() => handleSelectTypePost("Match", true)}
                        type="button"
                        className={
                          selectTypePost === "Match"
                            ? "inline-flex items-center py-2 px-4 text-white bg-yellow rounded-l-lg border border-gray-900 transition-all duration:200 hover:bg-amber-300  hover:text-black dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 text-black bg-amber-300 font-semibold text-sm dark:focus:bg-gray-700"
                            : "inline-flex items-center py-2 px-4 text-white bg-transparent rounded-l-lg border border-black transition-all duration:200 hover:bg-amber-300 hover:text-black dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 font-semibold text-sm dark:focus:bg-gray-700"
                        }
                      >
                        <img
                          className="w-5 h-5 mr-2"
                          src={logoMatch}
                          alt="logo match"
                        />
                        Match
                      </button>

                      <button
                        onClick={() => handleSelectTypePost("Normal", false)}
                        type="button"
                        className={
                          selectTypePost === "Normal"
                            ? "inline-flex items-center py-2 px-4 text-black font-semibold bg-yellow rounded-r-md border border-black transition-all duration:200 hover:yellow hover:text-black dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                            : "inline-flex items-center py-2 px-4 text-white font-semibold text-gray-900 bg-transparent rounded-r-md border border-black transition-all duration:200 hover:bg-amber-300 hover:text-black dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                        }
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
                              className={`p-2 text-gray-500 rounded ${
                                (imagePost.length > 3 || loadingPostImage) &&
                                "cursor-not-allowed pointer-events-none"
                              } cursor-pointer  `}
                            >
                              <label htmlFor="file-input-post">
                                <i
                                  className={`bi bi-image text-lg ${
                                    (imagePost.length > 3 ||
                                      loadingPostImage) &&
                                    "text-neutral-400"
                                  } text-yellow`}
                                ></i>
                              </label>
                              <input
                                id="file-input-post"
                                name="foto"
                                type="file"
                                onChange={handleSavePostImage}
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
                              ? "Match with people from all over the world..."
                              : "Tell people about your latest news..."
                          }`}
                          value={infoPost.description}
                          onChange={handleChangeDescriptionPost}
                          required
                        ></textarea>
                      </div>
                      <div className="grid grid-flow-col auto-cols-[minmax(0,_2fr)] gap-2 items-center bg-transparent">
                        {imagePost.length
                          ? imagePost.map((url, index) => (
                              <div className="relative pt-3" key={url}>
                                <i
                                  onClick={() => handleDeleteImageSend(index)}
                                  className="bi bi-x absolute bg-amber-300 text-black right-0 top-0 text-lg rounded-full border w-5 h-5 flex justify-center items-center"
                                ></i>
                                <img
                                  className="w-full h-20 object-cover rounded"
                                  src={url}
                                  alt="post image"
                                />
                              </div>
                            ))
                          : null}
                        {loadingPostImage && (
                          <img
                            className="w-full h-20 object-cover rounded"
                            src={giftUpload}
                            alt="gif upload"
                          />
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className=" block m-auto px-5 py-2.5 text-sm font-medium text-center text-black font-semibold  bg-amber-300 rounded-lg transition-all duration:200 hover:bg-yellower disabled:bg-gray disabled:text-white"
                      disabled={disabled ? true : false}
                      onClick={handleSubmit}
                    >
                      Publish post
                    </button>
                  </form>
                </div>
              </Modal.Body>
            </Transition.Child>
          </div>
        </Modal>
      </Transition>
    </>
  );
}

export default MakePost;
