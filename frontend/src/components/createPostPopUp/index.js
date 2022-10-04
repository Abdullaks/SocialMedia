import React, { useState } from "react";
import "./style.css";
import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import { useDispatch } from "react-redux";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import PulseLoader from "react-spinners/PulseLoader";
import { createPost } from "../../functions/createPost";
import { toast } from "react-toastify";
import { uploadImages } from "../../functions/uploadImages";
import {getAllposts} from "../../features/post/postSlice"
export default function CreatePostPopUp({ user, setPostPopup }) {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const postSubmit = async () => {
    if (images && images.length) {
      setLoading(true);
      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      });
      const path = `${user.username}/post_images`;
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => {
        formData.append("file", image);
      });
      const response = await uploadImages(formData, path, user.token);
      const res = await createPost(
        null,
        null,
        text,
        response,
        user._id,
        user.token
      );
      setLoading(false);
      if (res === "ok") {
        setText("");
        setImages("");
        setPostPopup(false);
        dispatch(getAllposts())
      } else {
        console.log(res, "error");
        toast.error("error");
      }
    } else if (text) {
      setLoading(true);
      const response = await createPost(
        null,
        null,
        text,
        null,
        user._id,
        user.token
      );
      setLoading(false);
      if (response === "ok") {
        setText("");
        setPostPopup(false);
        dispatch(getAllposts())
      } else {
        console.log(response, "error");
      }
    } else {
      console.log("post something");
    }
  };
  return (
    <div className="blur">
      <div className="postBox">
        <div className="box_header">
          <div className="small_circle">
            <i
              className="exit_icon"
              onClick={() => {
                setPostPopup(false);
              }}
            ></i>
          </div>
          <span>Create Post</span>
        </div>

        <div className="box_profile">
          <img src={user?.profilePicture} alt="" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">{user?.username}</div>
            <div className="box_privacy">
              <img src="../../../icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>

        {!showPrev ? (
          <>
            <EmojiPickerBackground text={text} setText={setText} user={user} />
          </>
        ) : (
          <ImagePreview
            text={text}
            setText={setText}
            user={user}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />

        <button className="post_submit" onClick={postSubmit} disabled={loading}>
          {loading ? <PulseLoader color="#fff" size={5} /> : "Post"}
        </button>
      </div>
    </div>
  );
}
