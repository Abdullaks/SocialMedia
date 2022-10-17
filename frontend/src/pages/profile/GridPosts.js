import { useState } from "react";

export default function GridPosts({
  showPosts,
  setShowPosts,
  showSavedPosts,
  setShowSavedPosts,
  visitor,
}) {


const [saved, setSaved] = useState(false)


  const onSavedPost = () => {
    setSaved(true)
    setShowPosts(false);
    setShowSavedPosts(true);
  };
  const onPost = () => {
        setSaved(false);

    setShowPosts(true);
    setShowSavedPosts(false);
  };
  return (
    <div className="createPost">
      <div
        className="createPost_header"
        style={{ justifyContent: "space-between" }}
      >
        {visitor && <div className="left_header_grid">Posts</div>}
        <div className="flex"></div>
      </div>
      {visitor && <div className="create_splitter"></div>}
      <div className="createPost_body grid2">
        <div className={`view_type ${saved ? "" : "active"}`} onClick={onPost}>
          Posts
        </div>
        {!visitor && (
          <div
            className={`view_type ${saved ? "active" : ""}`}
            onClick={onSavedPost}
          >
            Saved{" "}
          </div>
        )}
      </div>
    </div>
  );
}
