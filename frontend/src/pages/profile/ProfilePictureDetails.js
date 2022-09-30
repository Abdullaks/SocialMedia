import React, { useState } from "react";
import ProfilePicture from "../../components/profile/profilePicture";
export default function ProfielPictureDetails({ profile, visitor }) {
  const [profilePopup, setProfilePopup] = useState(false);
  return (
    <div className="profile_img_wrap">
      {profilePopup && (
        <ProfilePicture
          setProfilePopup={setProfilePopup}
          // pRef={pRef}
          //  photos={photos}
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
              othername
              {othername && `(${othername})`}
            </div> */}
          </div>
          <div className="profile_friend_count"></div>
          <div className="profile_friend_imgs"></div>
        </div>
      </div>
      {visitor ? (
        ""
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
