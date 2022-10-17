import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { followUser, unFollowUser } from "../../features/profile/profileSlice";

export default function FollowerPopup({ setFollowersPopup, profile}) {
  const refInput = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="blur">
      <div className="postBox pictureBox">
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => {
              setFollowersPopup(false);
            }}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Followers</span>
        </div>
        <div className="update_picture_wrap">
          <ul>
            {profile?.followers?.map((item, i) => (
              <li
                key={i}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Link to={`/profile/${item?.username}`}>
                  <div
                    className="flex ml-2"
                    onClick={() => {
                      setFollowersPopup(false);
                    }}
                  >
                    {" "}
                    <img
                      src={item?.profilePhoto}
                      width="40"
                      height="40"
                      style={{ borderRadius:"50%", objectFit: "cover"}}
                      className="rounded-full"
                    />
                    <div className="flex flex-col ml-2">
                      {" "}
                      <span className="font-medium text-black">
                        {item.username}
                      </span>{" "}
                    </div>
                  </div>
                </Link>
                <div>
                  {user?.following?.includes(item?._id) ? (
                    <span onClick={() => dispatch(unFollowUser(item?._id))}>
                      Unfollow
                    </span>
                  ) : (
                    <span onClick={() => dispatch(followUser(item?._id))}>
                      Follow
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="old_pictures_wrap"></div>
      </div>
    </div>
  );
}
