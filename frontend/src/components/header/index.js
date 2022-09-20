import React, { useState } from "react";
import { Link } from "react-router-dom";
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
} from "../../svg";
import "./style.css";
import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const [showSearchMenu, setShowSearchMenu] = useState(false);

  const color = "#65676b";
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            AKS
            {/* <Logo/>  */}
          </div>
        </Link>
        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input type="text" placeholder="Search" className="hide_input" />
        </div>
      </div>
      {showSearchMenu && <SearchMenu color={color}  setShowSearchMenu={setShowSearchMenu} />}
      <div className="header_middle">
        <Link to="/" className="middle_icon  active">
          <HomeActive />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right">
        <Link to="/" className="profile_link hover1">
          <img src={user?.profilePicture} alt="" />
          <span>{user?.username}</span>
        </Link>
        <div className="circle_icon hover1">
          <Menu />
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">1</div>
        </div>
        <div className="circle_icon hover1">
          <ArrowDown />
        </div>
      </div>
    </header>
  );
}
