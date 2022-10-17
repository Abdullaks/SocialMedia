import React, { useState } from "react";
import ProfilePicture from "../../components/profile/profilePicture";
import Follow from "./Follow";
import FollowerPopup from "./FollowerPopup";
import FollowingPopup from "./FollowingPopup";
export default function ProfielPictureDetails({
  profile,
  visitor,
  userName,
 
}) {
  const [profilePopup, setProfilePopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);
  const [followingPopup, setFollowingPopup] = useState(false);
  return (
    <div className="profile_img_wrap">
      {profilePopup && <ProfilePicture setProfilePopup={setProfilePopup} />}
      {followersPopup && (
        <FollowerPopup
          followersPopup={followersPopup}
          setFollowersPopup={setFollowersPopup}
          profile={profile}
        />
      )}

      {followingPopup && (
        <FollowingPopup
          followingPopup={followingPopup}
          setFollowingPopup={setFollowingPopup}
          profile={profile}
        />
      )}
      <div className="profile_w_left">
        <div className="profile_w_img">
          <div
            className="profile_w_bg"
            // ref={pRef}
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile.profilePicture})`,
            }}
          ></div>
          {!visitor && (
            <div
              className="profile_circle hover1"
              onClick={() => setProfilePopup(true)}
            >
              <i className="camera_filled_icon"></i>
            </div>
          )}
        </div>
        <div className="profile_w_col">
          <div className="profile_name">{profile?.username}</div>
          <div
            className="profile_friend_count"
            style={{ display: "flex", gap: "5px" }}
          >
            {" "}
            <div>
              <a href="#posts">
                <div className="profile_card_count">
                  {profile?.posts?.length === 0
                    ? "0 post"
                    : profile?.posts?.length === 1
                    ? "1 post"
                    : `${profile?.posts?.length} posts`}
                </div>
              </a>
            </div>
            <div>
              {profile?.followers && (
                <div
                  className="profile_card_count"
                  onClick={() => setFollowersPopup(true)}
                >
                  {profile?.followers.length === 0
                    ? "0 Follower"
                    : profile?.followers.length === 1
                    ? "1 Follower"
                    : `${profile?.followers.length} Followers`}
                </div>
              )}
            </div>
            <div>
              {profile?.following && (
                <div
                  className="profile_card_count "
                  onClick={() => setFollowingPopup(true)}
                >
                  {profile?.following.length === 0
                    ? " 0 Following"
                    : profile?.following.length === 1
                    ? " 1 Following"
                    : ` ${profile?.following.length} Followings`}
                </div>
              )}
            </div>
          </div>
          <div className="profile_friend_imgs"></div>
          {visitor && (
            <div style={{ margin: "10px" }}>
              <Follow
                friendship={profile.followCheck}
                profileId={profile._id}
                userName={userName}
              />
            </div>
          )}
        </div>
      </div>
      {visitor ? (
        <div className="profile_w_right"></div>
      ) : (
        ""
        // <div className="profile_w_right">
        //   <div className="blue_btn">
        //     <img src="../../../icons/plus.png" alt="" className="invert" />
        //     <span>Add to story</span>
        //   </div>
        //   <div className="gray_btn">
        //     <i className="edit_icon"></i>
        //     <span>Edit profile</span>
        //   </div>
        // </div>
      )}
    </div>
  );
}
