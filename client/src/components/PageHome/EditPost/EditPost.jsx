import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { validatePost } from "../../helpers/validateForm";
import { uploadImage } from "../../helpers/uploadImage";
import Swal from "sweetalert2";
import {
  updatePostFront,
  clearState,
  updatePostRefresh,
} from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "@headlessui/react";
const giftUpload =
  "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921";
function EditPost({ id, description, imagePosts, show, setShow, isMatch }) {
  const dispatch = useDispatch();
  const [infoPost, setInfoPost] = useState({
    id: id,
    description: description,
    image: imagePosts,
    // hashtags: hashtags
  });

  const [showModal, setShowModal] = useState(show);
  const [loadingPostImage, setLoadingPostImage] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [imagePost, setImagePost] = useState(
    imagePosts.map((image) => image.url)
  );
  const handleChangeDescriptionPost = (e) => {
    setInfoPost({
      ...infoPost,
      description: e.target.value,
    });
    validatePost({ description: e.target.value }, setDisabled);
  };
  const handleSavePostImage = async (e) => {
    await uploadImage(e, setLoadingPostImage, setInfoPost, null, setImagePost);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "question",
      title: "Are you sure you would like to update this post?",
      confirmButtonText: "Yes",
      showDenyButton: true,
      denyButtonText: "No",
      background: "#1e1c1d",
      color: "#fafbfd",
      iconColor: "#fcd34d",
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(updatePostFront(infoPost)).then((res) =>
          console.log(res, "update")
        );
        handleAlert2();
      }
    });
  };
  const handleAlert2 = () => {
    Swal.fire({
      icon: "success",
      iconColor: "#fcd34d",
      title: "Updated succesfully.",
      background: "#1e1c1d",
      color: "#fafbfd",
    }).then((res) => {
      dispatch(clearState("update"));
      setShow(false);
      dispatch(updatePostRefresh());
    });
  };
  const handleDeleteImage = (url) => {
    const filterImage = imagePost.filter((imageUrl) => imageUrl !== url);
    const mapPostImages = filterImage.map((image) => {
      return { url: image };
    });

    setImagePost(filterImage);
    setInfoPost({ ...infoPost, image: mapPostImages });
  };

  return (
    <Transition
      appear
      show={showModal}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Modal
        show={showModal}
        size="2xl"
        popup={true}
        onClose={() => {
          setShowModal(!showModal);
          setShow(!show);
        }}
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
                <form>
                  <div className="w-full mb-4 bg-transparent border border-amber-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className=" flex items-center justify-between px-3 py-2 border-b border-amber-300 dark:border-gray-600">
                      <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                        <div className="flex items-center space-x-1 sm:pr-4 ">
                          <button
                            type="button"
                            className={`p-2 text-gray-500 rounded cursor-pointer  dark:text-gray-400 ${
                              (imagePost.length > 3 || loadingPostImage) &&
                              "cursor-not-allowed pointer-events-none"
                            }`}
                          >
                            <label htmlFor="file-input">
                              <i
                                className={`bi bi-image text-lg text-yellow  ${
                                  (imagePost.length > 3 || loadingPostImage) &&
                                  "text-neutral-400"
                                } `}
                              ></i>
                            </label>
                            <input
                              id="file-input"
                              name="foto"
                              type="file"
                              onChange={handleSavePostImage}
                              className="hidden"
                            />
                          </button>
                        </div>
                        <div className="flex flex-wrap items-center space-x-1 sm:pl-4">
                          <span className="text-white text-xs uppercase ">
                            Post: {isMatch ? "Match" : "Normal"}
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
                        value={infoPost.description}
                        onChange={handleChangeDescriptionPost}
                        required
                      ></textarea>
                    </div>
                    <div className="grid grid-flow-col auto-cols-[minmax(0,_2fr)] gap-2 items-center bg-transparent">
                      {imagePost.length
                        ? imagePost.map((image, index) => (
                            <div className="relative pt-3" key={index}>
                              <i
                                onClick={() => handleDeleteImage(image)}
                                className="bi bi-x absolute bg-amber-300 text-black right-0 top-0 text-lg rounded-full border w-5 h-5 flex justify-center items-center"
                              ></i>
                              <img
                                className="w-full h-20 object-cover rounded"
                                src={image}
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
  );
}

export default EditPost;
