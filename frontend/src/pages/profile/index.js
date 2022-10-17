import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/header";
import ProfielPictureDetails from "./ProfilePictureDetails";
import ProfileMenu from "./ProfileMenu";
import CreatePost from "../../components/createPost";
import CreatePostPopUp from "../../components/createPostPopUp";
import Cover from "./Cover";
import GridPosts from "./GridPosts";
import { useParams } from "react-router-dom";
import Post from "../../components/post";
import Friends from "./Friends";
import Bio from "../../components/profile/Bio";
import { getProfile, reset } from "../../features/profile/profileSlice";
import SavedPosts from "../../components/saved Posts";

export default function Profile() {
  const [postPopup, setPostPopup] = useState(false);
const [showPosts, setShowPosts] = useState(true);
const [showSavedPosts, setShowSavedPosts] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username } = useParams();
  var userName = username === undefined ? user?.username : username;
  var visitor = userName === user?.username ? false : true;
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    dispatch(getProfile(userName));
  }, [user, navigate, dispatch, userName]);

  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <Cover cover={profile?.coverPicture} visitor={visitor} />
          <ProfielPictureDetails
            profile={profile}
            visitor={visitor}
            userName={userName}
          />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <div
            // className="profile_grid"
            >
              <div className="profile_left">
                <Bio visitor={visitor} profile={profile} />
                {/* <Friends friends={profile.friends} /> */}
              </div>
              <div className="profile_right">
                {!visitor && (
                  <CreatePost user={user} setPostPopup={setPostPopup} />
                )}
                {postPopup && (
                  <CreatePostPopUp user={user} setPostPopup={setPostPopup} />
                )}

                <GridPosts
                  showPosts={showPosts}
                  setShowPosts={setShowPosts}
                  showSavedPosts={showSavedPosts}
                  setShowSavedPosts={setShowSavedPosts}
                  visitor={visitor}
                  
                />
                <>
                  {showPosts && (
                    <div className="posts" id="posts">
                      {profile.posts && profile.posts.length ? (
                        profile.posts.map((post) => (
                          <Post
                            post={post}
                            user={user}
                            key={post._id}
                            profile
                          />
                        ))
                      ) : (
                        <div className="no_posts">No posts available</div>
                      )}
                    </div>
                  )}
                </>
                {!visitor && (
                  <>
                    {showSavedPosts && (
                      <div className="posts" id="posts">
                        {profile?.savedPosts && profile.savedPosts?.length ? (
                          profile.savedPosts.map((post) => (
                            <SavedPosts
                              post={post}
                              user={user}
                              key={post._id}
                              profile
                            />
                          ))
                        ) : (
                          <div className="no_posts">No posts are saved</div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
