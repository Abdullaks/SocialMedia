import React, { useState } from "react";
import ProfilePicture from "../../components/profile/profilePicture";
import Follow from "./Follow";
export default function ProfielPictureDetails({ profile, visitor, userName }) {
  const [profilePopup, setProfilePopup] = useState(false);
  return (
    <div className="profile_img_wrap">
      {profilePopup && (
        <ProfilePicture
          setProfilePopup={setProfilePopup}
          // pRef={pRef}
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
          <div className="profile_name">
            {profile?.username}
            {/* <div className="othername">
              {othername && `(${othername})`}
            </div> */}
          </div>
          <div className="profile_friend_count" style={{ display: "flex",gap:"5px" }}>
            <div >
              {profile?.following && (
                <div className="profile_card_count">
                  {profile?.followers.length === 0
                    ? "0 Follower"
                    : profile?.followers.length === 1
                    ? "1 Follower"
                    : `${profile?.followers.length} Followers`}
                </div>
              )}
            </div>
            <div >
              {profile?.friends && (
                <div className="profile_card_count ">
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
          <div style={{margin:"10px"}}> 
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
        <div className="profile_w_right">
          <div className="blue_btn">
            <img src="../../../icons/plus.png" alt="" className="invert" />
            <span>Add to story</span>
          </div>
          <div className="gray_btn">
            <i className="edit_icon"></i>
            <span>Edit profile</span>
          </div>
        </div>
      )}
    </div>
  );
}
