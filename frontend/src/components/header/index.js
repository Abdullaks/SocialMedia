import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Notifications,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Menu,
  Messenger,
  Search,
  Watch,
  ArrowDown,
  Market,
  Home,
  FriendsActive,
} from "../../svg";
import "./style.css";
import SearchMenu from "./SearchMenu";
import { useDispatch, useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import { ChatState } from "../../context/chatProvider";

export default function Header({ page }) {
  const { user } = useSelector((state) => state.auth);
const { notification, setNotification } = ChatState();
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const color = "#65676b";
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <header>
      <div className="header_left">
        <Link to="/home" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input type="text" placeholder="Search..." className="hide_input" />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu
          color={color}
          setShowSearchMenu={setShowSearchMenu}
          token={user.token}
        />
      )}
      <div className="header_middle">
        <Link
          to="/"
          className={`middle_icon ${page === "home" ? "active" : "hover1"}`}
        >
          {page === "home" ? <HomeActive /> : <Home color={color} />}
        </Link>
        <Link
          to="/friends"
          className={`middle_icon ${page === "friends" ? "active" : "hover1"}`}
        >
          {page === "friends" ? <FriendsActive /> : <Friends color={color} />}
        </Link>
        {/* <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link> */}
        <Link to="#" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="#" className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right">
        <Link
          to="/profile"
          className={`profile_link hover1 ${
            page === "profile" ? "active_link" : ""
          }`}
        >
          <img
            src={
              user?.profilePicture
                ? user.profilePicture
                : "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png "
            }
          />
          <span>{user?.username}</span>
        </Link>

        <Link to="/chat">
          <div className="circle_icon hover1">
            <Messenger />
            {notification.length > 0 && (
              <div className="right_notification">{notification.length}</div>
            )}
          </div>
        </Link>
        {/* <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">1</div>
        </div> */}

        <div
          className="circle_icon hover1"
          onClick={() => {
            setShowUserMenu((prev) => !prev);
          }}
        >
          <ArrowDown />
        </div>
        {showUserMenu && <UserMenu user={user} />}
      </div>
    </header>
  );
}
