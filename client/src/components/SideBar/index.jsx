import { Sidebar } from "flowbite-react";
import React from "react";
import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import HiChartPi from "../../assets/coheteHenry.png";
import { useAuth } from "../auth";
import DropDownSelect from "../DropDownSelect";
import SearchBar from "../SearchBar";
import henryGramLogo from "../../assets/logoHenry.png";
import { useSelector } from "react-redux";
import { searchUserAction } from "../../redux/actions";
import CardUser from "../CardUser";

function SideBar() {
  const searchUser = useSelector((state) => state.searchUser);
  const userInformation = useSelector((state) => state.userInformation);
  const chatTimeReal = useSelector((state) => state.chatTimeReal);
  const friendsByUser = useSelector((state) => state.friendsByUser);
  const { id } = useParams();
  const { pathname } = useLocation();
  let set = new Set(chatTimeReal.map(JSON.stringify));
  let arrSinDuplicaciones = Array.from(set).map(JSON.parse);
  const requestFriends = friendsByUser.filter(
    (friend) => Number(friend.status) === 2
  );
  const pruebaRequestFriends = [
    {
      id: "639b57d15871ad62a8b88c2d",
      text: "Diego Apolo",
      avatar:
        "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
    },
    {
      id: "639b57fa5871ad62a8b88c34",
      text: "Diego Apolo",
      avatar:
        "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
    },
    {
      id: "639e3f1acce29471f3b57770",
      text: "Diego Apolo",
      avatar:
        "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
    },
  ];
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <aside
      className="sm:block hidden w-[22rem] bgSideBar font-sans relative z-10 overflow-x-visible bg-[url('https://besthqwallpapers.com/Uploads/21-8-2020/140202/thumb2-yellow-lines-background-material-design-yellow-lines-creative-yellow-background-lines-background.jpg')] "
      aria-label="Sidebar"
    >
      <i
        className="bi bi-arrow-left-short text-4xl ml-2 absolute text-black top-10 left-8 font-black"
        onClick={() => navigate(-1)}
      ></i>
      <div className="overflow-y-auto  py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 overflow-x-hidden">
        <ul>
          <div className="flex items-center justify-center pl-2.5 mt-5 mb-5">
            <img
              src={henryGramLogo}
              className="w-24 h-12 text-black object-cover"
              alt="Flowbite Logo"
            />
          </div>
          <div className="mb-12">
            <SearchBar handleChangeSearch={searchUserAction} />
            <div className="absolute -right-56 top-24 w-56 z-10">
              {searchUser.length
                ? searchUser
                    .map((friend, index) => (
                      <CardUser key={index} friend={friend} />
                    ))
                    .slice(0, 5)
                : null}
            </div>
          </div>

          <ul className="flex flex-col">
            <li className=" flex items-center px-2 py-5 relative text-base font-medium text-gray-900 rounded-lg cursor-pointer transition duration:200 border border-transparent hover:border-white hover:text-white">
              <DropDownSelect
                status={"APPLICATION"}
                icon={"bi-people-fill"}
                select={pruebaRequestFriends}
                requests={requestFriends.length}
                confirmed={true}
                position={"left"}
              />
            </li>

            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? activeStyle : notActiveStyle
                }
              >
                <i className={`bi bi-house-fill text-2xl `}></i>
                <span className="ml-3 text_sombra text-lg">HOME</span>
              </NavLink>
            </li>
            <li className="relative ">
              <NavLink
                to="/message"
                className={({ isActive }) =>
                  isActive ? activeStyle : notActiveStyle
                }
              >
                <i className={`bi bi-chat-dots-fill text-2xl `}></i>
                <span className="ml-3 text_sombra text-lg">INBOX</span>
                {arrSinDuplicaciones.length &&
                !["/message", `/message/chat/${id}`].includes(pathname) ? (
                  <span className="bg-red-600 w-5 h-5 rounded-full absolute top-4 left-5 flex items-center justify-center text-xs">
                    {arrSinDuplicaciones?.length}
                  </span>
                ) : null}
              </NavLink>
            </li>
            <li
              onClick={() => auth.logout()}
              className=" flex items-center px-2 py-5 border border-transparent cursor-ponter text-base font-medium text-gray-900 rounded-lg cursor-pointer transition duration:200 hover:border-white hover:text-white"
            >
              <i className={`bi bi-box-arrow-left text-2xl `}></i>
              <span className="ml-3 text-black text_sombra text-lg">
                LOGOUT
              </span>
            </li>
          </ul>

          <NavLink
            to={`/profile/${userInformation?._id}`}
            className="absolute bottom-8 inset-x-0 border-t pt-10 border-transparent transition duration:200 hover:bg-white hover:bg-opacity-40"
          >
            <img
              src={userInformation?.avatar}
              className="w-12 h-12  block m-auto rounded-full object-cover"
              alt="Flowbite Logo"
            />
            <span className="uppercase text-center block py-1 text_sombra text-lg font-semibold">{`Welcome ${userInformation?.firstName}`}</span>
          </NavLink>
        </ul>
      </div>
    </aside>
  );
}
const activeStyle =
  "flex items-center px-2 py-5 border border-white font-medium rounded-lg bg-yellow text-white";
const notActiveStyle =
  "flex items-center px-2 py-5 font-medium rounded-lg border border-yellow hover:text-white hover:border-white transition duration:200";

export default SideBar;
