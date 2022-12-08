import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementValue } from "../../redux/actions";

function Home() {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.value);
  const handleClick = () => {
    dispatch(incrementValue());
  };
  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleClick}>Incrementar</button>
      <span>{value}</span>
    </div>
  );
}

export default Home;
