import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
} from "../../svg";
import "./style.css";
import SearchMenu from "./SearchMenu";
import { useDispatch, useSelector } from "react-redux";
import { logout ,reset} from "../../features/auth/authSlice";

export default function Header({page}) {
  const { user } = useSelector((state) => state.auth);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const color = "#65676b";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/")
  }
  
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
        <Link to="/" className={`middle_icon ${page === "home" ? "active" : "hover1"}`} >
          {page === "home" ? <HomeActive /> : <Home color={color} />}
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
        <Link to="/profile"className={`profile_link hover1 ${
            page === "profile" ? "active_link" : ""
          }`}>
          {/* <img src={user?.profilePicture} alt="" /> */}
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
        <div className="circle_icon hover1"
        onClick={onLogout} >
          LO
        </div>
        <div className="circle_icon hover1">
          <ArrowDown />
        </div>
      </div>
    </header>
  );
}
