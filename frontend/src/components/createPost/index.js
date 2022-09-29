import React from "react";
import { Feeling, LiveVideo, Photo } from "../../svg";
import "./style.css";
export default function CreatePost({ user,setPostPopup }) {
  return (
    <div className="createPost">
      <div className="createPost_header">
        <img src={user?.profilePicture?user.profilePicture:"https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png"} alt="" />
        <div className="open_post hover2"
        onClick={()=>{setPostPopup(true)}} >
          Post Something.., {user?.username}
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body">
        <div className="createPost_icon hover1">
          <LiveVideo color="#f3425f" />
          Live Video
        </div>
        <div className="createPost_icon hover1">
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        <div className="createPost_icon hover1">
          <Feeling color="#f7b928" />
          Feeling/Activity
        </div>
      </div>
    </div>
  );
}
