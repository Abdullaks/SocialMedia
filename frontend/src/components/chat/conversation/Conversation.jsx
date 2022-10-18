import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './conversation.css'
export default function Conversation({conversation,currentUser}) {
  const [friend, setFriend] = useState(null);
   useEffect(() => {
     const friendId = conversation.members.find((m) => m !== currentUser._id);
     const getUser = async () => {
       try {
         const res = await axios.get("http://localhost:8800/api/user?userId=" + friendId,{
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        }

       } );
         setFriend(res.data);
       } catch (err) {
         console.log(err);
       }
     };
     getUser();
   }, [currentUser, conversation]);
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          friend?.profilePicture
            ? friend.profilePicture
            : "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png"
        }
        alt=""
      />
      <span className="conversationName">{friend?.username}</span>
    </div>
  );
}
