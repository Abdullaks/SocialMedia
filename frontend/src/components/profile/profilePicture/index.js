import { useRef, useState } from "react";
import ImagePreview from "./ImagePreview";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { uploadImages } from "../../../functions/uploadImages";
import { updateprofilePicture } from "../../../functions/profile";
import { createPost } from "../../../functions/createPost";
import { getProfile } from "../../../features/profile/profileSlice";

export default function ProfilePicture({ setProfilePopup }) {
  const refInput = useRef(null);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector( (state) => state.auth);
  const dispatch= useDispatch()
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
      setImage(event.target.result);
    };
  };
  const updateProfielPicture = async () => {
    try {
      setLoading(true);
      let img = image
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/profile_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await uploadImages(formData, path, user.token);
      const updated_picture = await updateprofilePicture(
        res[0].url,
        user.token
      );

      if (updated_picture === "ok") {
        const new_post = await createPost(
          "profilePicture",
          null,
          "My New profile. picture",
          res,
          user._id,
          user.token
        );

        if (new_post === "ok") {
          setLoading(false);
          setImage("");
          setProfilePopup(false);
          dispatch(getProfile(user.username))
        } else {
          setLoading(false);
          setError(new_post);
        }
      } else {
        setLoading(false);
        setError(updated_picture);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="blur">
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/jpeg,image/png,image/webp,image/gif"
      />
      <div className="postBox pictureBox">
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => {
              setProfilePopup(false);
            }}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Update profile picture</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button
              className="light_blue_btn"
              onClick={() => refInput.current.click()}
            >
              <i className="plus_icon filter_blue"></i>
              Upload photo
            </button>
          </div>
        </div>
        {error && (
          <div className="postError comment_error">
            <div className="postError_error">{error}</div>
            <button className="blue_btn" onClick={() => setError("")}>
              Try again
            </button>
          </div>
        )}
        <div className="old_pictures_wrap">
          {/* {image && (
          <div className="grid_1">
            <img src={image.url} alt="pls reload" className="img-1" />
          </div>
        )} */}

          {image && (
            <ImagePreview
              //  user={user}
              image={image}
              setImage={setImage}
              //  setShowPrev={setShowPrev}
            />
          )}
        </div>
        {image && (
          <div className="update_submit_wrap">
            <div className="blue_link"
            onClick={()=>setImage("")}
            >Cancel</div>
            <button className="blue_btn"
             disabled={loading}
             onClick={() => updateProfielPicture()}>
              {loading ? <PulseLoader color="#fff" size={5} /> : "Save"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
