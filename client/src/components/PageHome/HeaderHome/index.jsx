import SearchBar from "../../SearchBar";
import MakePost from "../MakePost";

function HeaderHome() {
  return (
    <div className=" w-full bg-stone-800 h-16 flex items-center justify-between ">
      <div className="w-6/12 pl-5">
        <SearchBar />
      </div>
      <MakePost />
    </div>
  );
}

export default HeaderHome;
