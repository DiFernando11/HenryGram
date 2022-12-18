import { useState } from "react";
import logo from "../../assets/hglogo.png";
import { useAuth } from "../auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import profilePicture from "../../assets/profilePicture.jpg";
import { useSelector } from "react-redux";
import DropDownSelect from "../DropDownSelect/index";

export default function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const searchUser = useSelector((state) => state.searchUser);
  const userInformation = useSelector((state) => state.userInformation);
  const friendsByUser = useSelector((state) => state.friendsByUser);
  // const requestFriends = friendsByUser.filter(
  //   (friend) => Number(friend.status) === 3
  // );
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
    <nav className="w-full bg-black shadow  h-16 z-10">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 relative">
        <div>
          <div className="flex items-center justify-between py-3 md:block">
            <div className="flex items-center  ">
              <i
                className="bi bi-arrow-left-short text-white text-3xl"
                onClick={() => navigate(-1)}
              ></i>
              <Link to={"/home"}>
                <img src={logo} alt="logo" className="w-20" />
              </Link>
              <div>
                <SearchBar
                // searchFriend={searchFriend}
                // handleChangeInfoUsers={handleChangeInfoUsers}
                />
                <div className="absolute w-56 z-10">
                  {searchUser.length
                    ? searchUser.map((friend) => (
                        <div className=" bg-black p-3 z-10 border border-slate-900 ">
                          <Link
                            to={`/profile/${friend._id}`}
                            className="flex items-center gap-3"
                          >
                            <img
                              className="w-10 h-10 rounded-full"
                              src={friend.avatar}
                              alt={`Friend ${friend.firstName}`}
                            />
                            <span>
                              {friend.firstName} {friend.lastName}
                            </span>
                          </Link>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="bg-black items-center rounded justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className=" relative text-white flex gap-2 items-center p-2 text-white border border-black rounded-lg transition duration:200  cursor-pointer">
                <DropDownSelect
                  status={"APPLICATION"}
                  icon={"bi-people-fill"}
                  select={pruebaRequestFriends}
                  requests={friendsByUser.length}
                  confirmed={true}
                />
                {/* <i className="bi bi-people-fill text-2xl "></i>
                <span className="w-4 h-4 bg-red-600 rounded-full absolute top-1 left-5 flex justify-center items-center text-xs">
                  {requestFriends.length}
                </span>
                <span>APPLICATIONS</span>
                <div className="absolute -bottom-12 border w-full">
                  {requestFriends.map((friend) => (
                    <div className="border">{friend.status}</div>
                  ))}
                </div> */}
              </li>
              {routes.map((route) => {
                return (
                  <li className="text-white">
                    <NavLink
                      to={route.to ? route.to : null}
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center p-2 border border-white font-medium rounded-lg"
                          : "flex items-center p-2 text-white border border-black font-medium rounded-lg transition duration:200 hover:shadow-sm hover:shadow-gray"
                      }
                      onClick={
                        route.page === "LOGOUT" ? () => auth.logout() : null
                      }
                    >
                      {route.page === "PROFILE" ? (
                        <img
                          src={userInformation?.avatar}
                          className="w-16 h-10 object-cover rounded-full"
                        />
                      ) : (
                        <i className={`bi ${route.icon} text-2xl `}></i>
                      )}
                      {route.page === "PROFILE" ? null : (
                        <span>&nbsp;&nbsp;{route.page}</span>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
const routes = [];
routes.push(
  { to: "/home", page: "HOME", icon: "bi-house-fill", private: true },
  { to: "/message", page: "INBOX", icon: "bi-chat-dots-fill", private: true },
  { to: "/", page: "LOGOUT", icon: "bi bi-box-arrow-left", private: true },
  { to: "/profile", page: "PROFILE", icon: profilePicture, private: true }
);
