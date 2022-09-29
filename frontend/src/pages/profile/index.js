import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/header";
import ProfielPictureDetails from "./ProfilePictureDetails";
import ProfileMenu from "./ProfileMenu";
import PeoplelYouMayKnow from "./PeoplelYouMayKnow";
import Cover from "./Cover";
import GridPosts from "./GridPosts";
import CreatePost from "../../components/createPost";
import CreatePostPopUp from "../../components/createPostPopUp";
import { useParams } from 'react-router-dom'
import { getProfile, reset } from "../../features/profile/profileSlice";
import Post from "../../components/post";
import Friends from "./Friends";

export default function Profile() {
  const [postPopup, setPostPopup] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch= useDispatch()
  const { username}=useParams()
  var userName = username === undefined ? user.username : username;
  var visitor = userName === user.username ? false : true;
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    dispatch(getProfile(userName))
    return () => {
      dispatch(reset())
    }
  }, [user,navigate,dispatch,userName]);

  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top"
      //  ref={profileTop}
       >
        <div className="profile_container">
          <Cover
            cover={profile?.coverPicture}
            visitor={visitor}
            // photos={photos.resources}
          />
          <ProfielPictureDetails 
          profile={profile}
          visitor={visitor}
          // photos={photos.resources}
          // othername={othername}
          />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            {/* <PeoplelYouMayKnow /> */}
            <div
              // className={`profile_grid ${
              //   check && scrollHeight >= height && leftHeight > 1000
              //     ? "scrollFixed showLess"
              //     : check &&
              //       scrollHeight >= height &&
              //       leftHeight < 1000 &&
              //       "scrollFixed showMore"
              // }`}
            >
              <div className="profile_left" 
              // ref={leftSide}
              >
                {/* <Intro
                detailss={profile.details}
                visitor={visitor}
                setOthername={setOthername}
              /> */}
                {/* <Photos
                username={userName}
                token={user.token}
                photos={photos}
              /> */}
                <Friends friends={profile.friends} />
                
              </div>
              <div className="profile_right">
                {!visitor && (
                <CreatePost user={user} setPostPopup={setPostPopup} />
                 )} 
                 {postPopup && (
                  <CreatePostPopUp user={user} setPostPopup={setPostPopup} />
                )}
                <GridPosts />
                <div className="posts">
                  {profile.posts && profile.posts.length ? (
                  profile.posts.map((post) => (
                    <Post post={post} user={user} key={post._id} profile />
                  ))
                ) : (
                  <div className="no_posts">No posts available</div>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
