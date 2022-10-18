import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreatePost from "../../components/createPost";
import CreatePostPopUp from "../../components/createPostPopUp";
import Header from "../../components/header";
import RightHome from "../../components/home/right_bar";
import LeftHome from "../../components/home/side_bar";
import Post from "../../components/post/index";
import { getAllposts, reset } from "../../features/post/postSlice";
import "./style.css";

export default function Home() {
  const [postPopup, setPostPopup] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { posts, comments } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    dispatch(getAllposts());
  }, [user, navigate, dispatch, comments]);
  return (
    <div className="home">
      <Header page="home" />
      {/* <LeftHome user={user} /> */}
      <div className="home_middle">
        <CreatePost user={user} setPostPopup={setPostPopup} />
        <div className="posts">
          {posts?.map((post, i) => (
            <Post key={i} post={post} comments={comments} />
          ))}
          <CreatePost user={user} setPostPopup={setPostPopup} />
        </div>
        {postPopup && (
          <CreatePostPopUp user={user} setPostPopup={setPostPopup} />
        )}
      </div>
      {/* <RightHome user={user} /> */}
    </div>
  );
}
