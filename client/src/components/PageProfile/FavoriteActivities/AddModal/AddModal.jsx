import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCheck2 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { refreshUpdateProfile } from "../../../../redux/actions";

const AddModal = ({ technologies, favourites, add, show }) => {
  const [addingTechnologies, setAddingTechnologies] = useState([]);
  const [addingFavourites, setAddingFavourites] = useState([]);
  const dispatch = useDispatch();
  const handleAddTechnology = (e) => {
    e.preventDefault();
    if (e.nativeEvent.data === " ") {
      setAddingTechnologies([...addingTechnologies, e.target.value]);
      e.target.value = "";
    }
  };

  const handleAddFavourite = (e) => {
    e.preventDefault();
    if (e.nativeEvent.data === " ") {
      setAddingFavourites([...addingFavourites, e.target.value]);
      e.target.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    add(addingTechnologies, addingFavourites);
    show(false);
    setTimeout(() => dispatch(refreshUpdateProfile()), 500);
  };

  useEffect(() => {
    if (technologies) {
      setAddingTechnologies([...technologies]);
    }
    if (favourites) {
      setAddingFavourites([...favourites]);
    }
  }, [technologies, favourites]);

  return (
    <form className="fixed bg-black z-50 inset-x-0 inset-y-0 m-auto w-2/5 h-fit p-5 flex flex-col gap-4">
      <RxCross1
        className="text-white w-5 h-5 transition-all duration:100 absolute top-2 right-2 hover:cursor-pointer hover:scale-125"
        onClick={() => show(false)}
      />
      <div className="flex flex-col gap-3">
        <h2>Tecnologías</h2>
        <div className="flex flex-wrap w-full justify-start gap-2">
          {addingTechnologies.length > 0 &&
            addingTechnologies.map((technology, index) => (
              <div
                className="flex flex-row items-center bg-blueTw rounded-full h-fit w-fit px-2 py-1 gap-2 "
                key={index}
              >
                <p className="text-white text-md">{technology}</p>
                <RxCross1
                  className="text-white w-3 h-3 transition-all duration:100 hover:scale-125 hover:cursor-pointer"
                  onClick={() =>
                    setAddingTechnologies(
                      addingTechnologies.filter((technology, i) => i !== index)
                    )
                  }
                />
              </div>
            ))}
        </div>
        <input
          type="text"
          className="bg-zinc-700 border-none transition-all duration:100 focus:border-none rounded-full h-fit w-full p-2"
          placeholder="Agregar tecnología"
          onChange={handleAddTechnology}
        />
      </div>

      <div className="flex flex-col gap-3">
        <h2>Actividades favoritas</h2>
        <div className="flex flex-wrap w-full justify-start gap-2">
          {addingFavourites.length > 0 &&
            addingFavourites.map((favourite, index) => (
              <div
                className="flex flex-row items-center bg-lightBlue rounded-full h-fit w-fit px-2 py-1 gap-2 "
                key={index}
              >
                <p className="text-white text-md">{favourite}</p>
                <RxCross1
                  className="text-white w-3 h-3 hover:scale-125 hover:cursor-pointer"
                  onClick={() =>
                    setAddingFavourites(
                      addingFavourites.filter((favourite, i) => i !== index)
                    )
                  }
                />
              </div>
            ))}
        </div>
        <input
          type="text"
          className="bg-zinc-700 border-none focus:border-none rounded-full h-fit w-full p-2"
          placeholder="Agregar actividad favorita"
          onChange={handleAddFavourite}
        />
      </div>
      <div className="flex w-full justify-center">
        <button
          type="submit"
          className="bg-blueTw rounded-full h-fit w-20 p-2 transition-all duration:100 flex justify-center hover:scale-125"
          onClick={handleSubmit}
        >
          <BsCheck2 className="text-white w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default AddModal;
