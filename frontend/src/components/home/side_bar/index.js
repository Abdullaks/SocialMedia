import React, { useState } from "react";
import { Link } from "react-router-dom";
import LeftLink from "./LeftLink";
import "./style.css";
import { left } from "../../../data/home";
import { ArrowDown1 } from "../../../svg";
export default function LeftHome({ user }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="left_home scrollbar">
      <Link to="/profile" className="left_link hover2">
        <img
          src={
            user?.profilePicture
              ? user.profilePicture
              : "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png"
          }
          alt=""
        />
        <span>{user?.username}</span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}
      {/* {!visible && (
        <div
          className="left_link hover2"
            onClick={() => {setVisible(true);}}
        >
          <div className="small_circle">
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )} */}

      {visible && (
        <div className="more_left">
          {left.slice(8, left.length).map((link, i) => (
            <LeftLink
              key={i}
              img={link.img}
              text={link.text}
              notification={link.notification}
            />
          ))}
          <div
            className="left_link hover1"
            onClick={() => {
              setVisible(false);
            }}
          >
            <div className="small_circle rotate360">
              <ArrowDown1 />
            </div>
            <span>See less</span>
          </div>
        </div>
      )}
    </div>
  );
}
