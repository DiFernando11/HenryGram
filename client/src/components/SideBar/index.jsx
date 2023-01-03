import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth";
import SearchBar from "../SearchBar";
import henryGramLogo from "../../assets/logoHenry.png";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmedRequestFriendAction,
  searchUserAction,
} from "../../redux/actions";
import CardUser from "../CardUser";
import DropDown from "../DropDown/DropDown";
import { UserPlusIcon } from "@heroicons/react/20/solid";

function SideBar() {
  const searchUser = useSelector((state) => state.searchUser);
  const userInformation = useSelector((state) => state.userInformation);
  const chatTimeReal = useSelector((state) => state.chatTimeReal);
  const friendsByUser = useSelector((state) => state.friendsByUser);
  const [isActive, setIsActive] = useState(false);

  const { id } = useParams();
  const { pathname } = useLocation();
  let set = new Set(chatTimeReal.map(JSON.stringify));
  let arrSinDuplicaciones = Array.from(set).map(JSON.parse);
  const [friendsRequests, setFriendsRequests] = useState([]);
  const [numberFriendsRequest, setNumberFriendsRequest] = useState(0);
  const [answerFriend, setAnswerFriend] = useState(false);
  const [loadingFriends, setLoadignFriends] = useState(true);
  const dispatch = useDispatch();
  const requestFriends = friendsByUser
    .filter((friend) => Number(friend.status) === 2)
    .map((friend) => friend.recipient);

  const handleGetFriendsRequest = () => {
    if (!requestFriends?.length) setLoadignFriends(false);
    try {
      if (requestFriends?.length && !answerFriend) {
        axios
          .post(`http://localhost:3000/api/users/info`, {
            users: requestFriends,
          })
          .then((response) => {
            setFriendsRequests(response.data);
            setLoadignFriends(false);
          });
      }
    } catch (error) {
      console.error(error);
    }
    setAnswerFriend(true);
  };

  const handleResponseRequestFriend = (id, response) => {
    dispatch(
      confirmedRequestFriendAction({
        UserA: userInformation._id,
        UserB: id,
        resp: response,
      })
    );

    const filterRequestFriend = friendsRequests.filter(
      (friend) => friend._id !== id
    );
    setFriendsRequests(filterRequestFriend);
    setNumberFriendsRequest(numberFriendsRequest - 1);
  };
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setNumberFriendsRequest(requestFriends.length);
  }, [friendsByUser]);
  return (
    <aside
      className=" z-20 sm:block hidden w-[22rem] font-sans relative z-10 overflow-x-visible h-screen bg-[url('https://besthqwallpapers.com/Uploads/21-8-2020/140202/thumb2-yellow-lines-background-material-design-yellow-lines-creative-yellow-background-lines-background.jpg')] "
      aria-label="Sidebar"
    >
      <i
        className="bi bi-arrow-left-short text-4xl ml-2 absolute text-black top-10 left-8 font-black"
        onClick={() => navigate(-1)}
      ></i>
      <div className="overflow-y-auto  py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 overflow-x-hidden ">
        <ul>
          <div className="flex items-center justify-center pl-2.5 mt-5 mb-5 ">
            <img
              src={henryGramLogo}
              className="w-24 h-12 text-black object-cover"
              alt="Flowbite Logo"
            />
          </div>
          <div className="mb-12">
            <SearchBar handleChangeSearch={searchUserAction} />
            <div className="absolute -right-56 top-24 w-56 truncate">
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
            <li
              onClick={handleGetFriendsRequest}
              className={`flex items-center py-5 w-full relative ${
                isActive
                  ? "text-white border-white"
                  : "text-black border-transparent"
              } font-medium rounded-lg cursor-pointer transition duration:200 border  hover:border-white hover:text-white`}
            >
              {numberFriendsRequest > 0 ? (
                <>
                  <span className=" text-xs absolute top-5 left-6 flex items-center justify-center rounded-full w-5 h-5 bg-red-600 ">
                    {numberFriendsRequest}
                  </span>
                </>
              ) : null}
              <UserPlusIcon className="w-8 ml-1" />
              <DropDown
                isActive={isActive}
                setIsActive={setIsActive}
                friendRequests={friendsRequests}
                handleResponseRequestFriend={handleResponseRequestFriend}
                loadingFriends={loadingFriends}
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
                <i className={`bi bi-chat-dots-fill text-2xl z-0`}></i>
                <span className="ml-3 text_sombra text-lg z-0">INBOX</span>
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
              className=" flex items-center px-2 py-5 border border-transparent cursor-ponter text-base font-medium text-black rounded-lg cursor-pointer transition duration:200 hover:border-white hover:text-white"
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
            <div className="flex flex-col justify-center w-full">
              <img
                src={userInformation?.avatar}
                className="w-12 h-12  block m-auto rounded-full object-cover border bg-neutral-600 border-amber-300"
                alt="Flowbite Logo"
              />
              <span className="self-center uppercase truncate w-4/5 text-center block py-1 text_sombra text-lg font-semibold">{`Welcome ${userInformation?.firstName}`}</span>
            </div>
          </NavLink>
        </ul>
      </div>
    </aside>
  );
}
const activeStyle =
  "flex items-center px-2 py-5 border border-white font-medium rounded-lg bg-yellow text-white";
const notActiveStyle =
  "flex items-center px-2 py-5 font-medium rounded-lg border border-transparent text-black hover:text-white hover:border-white transition duration:200";

export default SideBar;
