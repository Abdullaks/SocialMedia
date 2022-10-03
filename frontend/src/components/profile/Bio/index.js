import { useEffect, useState } from "react";
// import Bio from "./Bio";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateBio } from "../../../features/profile/profileSlice";
import PulseLoader from "react-spinners/PulseLoader";

export default function Bio({ visitor, profile }) {
  const { user } = useSelector((state) => state.auth);
  // const [details, setDetails] = useState(profileDetails);
  const initial = {
    bio: profile?.bio ? profile.bio : " ",
  };
  const [infos, setInfos] = useState(initial);
  const [showBioInput, setShowBioInput] = useState(false);
  // const [bio, setBio] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setInfos(profile?.bio);
  }, [profile,dispatch]);
  const updateDetails = async () => {
    dispatch(updateBio( infos ));
    dispatch(getProfile(user.username))
    setShowBioInput(false);  
  };
  const handleChange = (e) => { 
    setInfos({ ...infos, bio: e.target.value });
  };
  return (
    <div className="profile_card">
      <div className="profile_card_header">
        <span>Bio</span>
        {!visitor && (
          <button
            className="gray_btn hover1"
            onClick={() => setShowBioInput(true)}
          >
            Edit
          </button>
        )}
      </div>

      {profile?.bio && !showBioInput && (
        <div className="info_col">
          {/* <p className="info_text">{profile?.bio}</p> */}
          <p className="info_text">{profile?.name?profile.name:""}</p>
          <span className="info_text">{profile?.bio}</span>
        </div>
      )}

      {showBioInput && (
        <>
          <div className="add_bio_wrap">
            <textarea
              placeholder="Add Bio...."
              value={infos.bio?infos.bio:profile?.bio}
              maxLength="100"
              
              className="textarea_blue details_input"
              onChange={handleChange}
            ></textarea>
            {/* )} */}
            <div className="flex">
              <div className="flex flex_left"></div>
              <div className="flex flex_right">
                <button
                  className="gray_btn"
                  onClick={() => setShowBioInput(false)}
                >
                  Cancel
                </button>
                <button
                  className="blue_btn"
                  onClick={() => {
                    updateDetails();
                    //   setShow(false);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* {!visitor && (
      <button
        className="gray_btn hover1 w100"
        onClick={() => setVisible(true)}
      >
        Edit Details
      </button>
    )} */}
      {/* {visible && !visitor && (
      <EditDetails
        details={details}
        handleChange={handleChange}
        updateDetails={updateDetails}
        infos={infos}
        setVisible={setVisible}
      />
    )} */}

      
    </div>
  );
}
