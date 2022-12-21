export const uploadImage = async (e, stateLoading, stateImage, setImagePost) => {
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

  stateImage ? ( prev => ({ ...prev, image:{url:file.secure_url}})) : null ;
  setImagePost(file.secure_url)
  console.log(file.secure_url);
  stateLoading(false);
};
