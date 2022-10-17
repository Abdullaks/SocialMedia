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
      <div className="postBox ">
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
        <div className="update_picture_wrap1">
          <ul>
            {profile?.followers?.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "20px",
                  alignItems: "center",
                }}
              >
                  <Link to={`/profile/${item?.username}`}>
                    <div
                      className="flex ml-3"
                      
                      onClick={() => {
                        setFollowersPopup(false);
                      }}
                    >
                      {" "}
                      <img
                        src={item?.profilePicture}
                        width="50"
                        height="50"
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                        className="rounded-full"
                      />
                      <div className="flex flex-col ml-2">
                        {" "}
                        <span
                          className="font-medium text-black"
                          style={{ color: "black", fontSize: "20px" }}
                        >
                          {item.username}
                        </span>{" "}
                      </div>
                    </div>
                  </Link>
                  <div
                    style={{ display: "flex", justifyContent: "flex-end",marginLeft:"190px" }}
                  >
                    {/* {user?.following?.includes(item?._id) ? (
                      <button className="gray_btn"
                       onClick={() => dispatch(unFollowUser(item?._id))}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button className="blue_btn"

                      onClick={() => dispatch(followUser(item?._id))}>
                        Follow
                     
                      </button>
                    )} */}
                  </div>
                
              </li>
            ))}
          </ul>
        </div>

        {/* <div className="old_pictures_wrap"></div> */}
      </div>
    </div>
  );
}
