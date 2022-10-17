import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  unFollowUser,
  followUser,
  getProfile,
} from "../../features/profile/profileSlice";

export default function Follow({ friendship, profileId, userName }) {
  const [follow, setFollow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setFollow(friendship);
  }, [friendship]);
  const followHandler = async () => {
    setFollow({ ...follow, following: true });
    await dispatch(followUser(profileId));
    dispatch(getProfile(userName));
  };
  const unfollowHandler = async () => {
    setFollow({ ...follow, following: false });
    await dispatch(unFollowUser(profileId));
    dispatch(getProfile(userName));
  };

  return (
    <div className="friendship">
      <div className="flex">
        {follow?.following ? (
          <button className="gray_btn" onClick={() => unfollowHandler()}>
            <img src="../../../icons/unfollowOutlined.png" alt="" />
            <span>Unfollow</span>
          </button>
        ) : (
          <button className="blue_btn" onClick={() => followHandler()}>
            <img src="../../../icons/follow.png" alt="" />
            <span>Follow</span>
          </button>
        )}
        <button className="gray_btn">
          <img src="../../../icons/message.png" alt="" />
          <span>Message</span>
        </button>
      </div>
    </div>
  );
}
