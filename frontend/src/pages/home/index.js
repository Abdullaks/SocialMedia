import React from "react";
import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost";
import CreatePostPopUp from "../../components/createPostPopUp";
import Header from "../../components/header";
import RightHome from "../../components/home/right_bar";
import LeftHome from "../../components/home/side_bar";
import Stories from "../../components/home/stories";
import "./style.css";

export default function Home() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="home">
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        {/* <Stories/> */}
        <CreatePost user={user} />
        <CreatePost user={user} />
        <CreatePost user={user} />
        <CreatePost user={user} />
        <CreatePost user={user} />
        <CreatePostPopUp  user={user}/>

      </div>
      <RightHome user={user} />
    </div>
  );
}
