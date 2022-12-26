import { editProfileAction } from "../../redux/actions/index"; 
import { useDispatch } from "react-redux";
export const uploadImage = async (
  e,
  stateLoading,
  stateImage,
  setImagePost,
  setImageArray,
) => {
  const files = e.target.files;
  const data = new FormData();
  data.append("file", files[0]);
  data.append("upload_preset", "Images");
  stateLoading(true);
  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgmv4orvc/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    file.secure_url && stateImage
      ? (prev) => ({ ...prev, image: { url: file.secure_url } })
      : null;
    file.secure_url && setImagePost ? setImagePost(file.secure_url) : null;
    file.secure_url && setImageArray
      ? setImageArray((prev) => [...prev, file.secure_url])
      : null;
    stateLoading(false);
      return file.secure_url
  } catch (error) {
    console.log(error);
  }

};
