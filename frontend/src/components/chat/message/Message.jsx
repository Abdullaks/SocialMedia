import React from "react";
import "./message.css";
import { format } from "timeago.js";

export default function Message({message,own,user}) {
  return (
    <div className={message.sender._id == user._id ? "message own" : "message"}>
      <div className="messageTop">
        {/* <img
          className="messageImg"
          src={message.sender._id == user._id?message.sender.profilePicture:""}
          alt=""
        /> */}
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
