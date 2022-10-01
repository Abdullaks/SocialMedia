import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useClickOutside from "../../helpers/clickOutside";
import PulseLoader from "react-spinners/PulseLoader";
import { updateCover } from "../../functions/profile";
import { uploadImages } from "../../functions/uploadImages";
import { createPost } from "../../functions/createPost";
import { getProfile } from "../../features/profile/profileSlice";

export default function Cover({ cover, visitor }) {
  const [showCoverMneu, setShowCoverMenu] = useState(false);
  const [coverPicture, setCoverPicture] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const refInput = useRef(null);
  useClickOutside(menuRef, () => setShowCoverMenu(false));
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name}  max 5mb allowed.`);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCoverPicture(event.target.result);
    };
  };

  const updateCoverPicture = async () => {
    try {
      setLoading(true);
      let img = coverPicture;
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/cover_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await uploadImages(formData, path, user.token);
      const updated_cover = await updateCover(res[0].url, user.token);
      if (updated_cover === "ok") {
        const new_post = await createPost(
          "cover",
          null,
          null,
          res,
          user._id,
          user.token
        );
        dispatch(getProfile(user.username));
        if (new_post === "ok") {
          setLoading(false);
          setCoverPicture("");
        } else {
          setLoading(false);
          setError(new_post);
        }
      } else {
        setLoading(false);
        setError(updated_cover);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="profile_cover">
      {coverPicture && (
        <div className="save_changes_cover">
          <button
            className="blue_btn opacity_btn"
            onClick={() => setCoverPicture("")}
          >
            Cancel
          </button>
          <button className="blue_btn " onClick={() => updateCoverPicture()}>
            {loading ? <PulseLoader color="#fff" size={5} /> : "Make Cover"}
          </button>
        </div>
      )}
      <input
        type="file"
        ref={refInput}
        hidden
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleImage}
      />
      {error && (
        <div className="postError comment_error cover_error">
          <div className="postError_error">{error}</div>
          <button className="blue_btn" onClick={() => setError("")}>
            Try again
          </button>
        </div>
      )}
      {coverPicture && (
        <div className="cover_crooper">
          <img src={coverPicture} className="cover" alt="" />
        </div>
      )}
      {cover && !coverPicture && <img src={cover} className="cover" alt="" />}
      {!visitor && (
        <div className="udpate_cover_wrapper">
          <div
            className="open_cover_update"
            onClick={() => setShowCoverMenu((prev) => !prev)}
          >
            <i className="camera_filled_icon"></i>
            Add Cover Photo
          </div>
          {showCoverMneu && (
            <div className="open_cover_menu" ref={menuRef}>
              <div
                className="open_cover_menu_item hover1"
                onClick={() => refInput.current.click()}
              >
                <i className="upload_icon"></i>
                Upload Photo
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
