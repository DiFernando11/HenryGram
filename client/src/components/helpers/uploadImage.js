export const uploadImage = async (e, stateLoading, stateImage) => {
  const files = e.target.files;
  const data = new FormData();
  data.append("file", files[0]);
  data.append("upload_preset", "Images");
  stateLoading(true);
  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dgmv4orvc/image/upload",
    {
      method: "POST",
      body: data,
    }
  );
  const file = await res.json();

  stateImage(file.secure_url);
  console.log(file.secure_url);
  stateLoading(false);
};
