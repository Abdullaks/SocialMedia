import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useOnClickOutside from "../../helpers/clickOutside";
import {
  deletePost,
  getAllposts,
  savePost,
} from "../../features/post/postSlice";
import EditPost from "./EditPost";
import { getProfile } from "../../features/profile/profileSlice";
import { Link } from "react-router-dom";
export default function PostMenu({
  postUserId,
  setShowPostMenu,
  // checkSaved,
  postId,
}) {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [test, setTest] = useState(postUserId === user._id ? true : false);
  const [checkSaved, setCheckSaved] = useState();
  const menu = useRef(null);
  useOnClickOutside(menu, () => setShowPostMenu(false));
  const dispatch = useDispatch();

  // useEffect(() => {
  //   {
  //     user?.savedPosts?.includes(postId)
  //       ? setCheckSaved(true)
  //       : setCheckSaved(false);
  //   }
  // }, [checkSaved]);

  const saveHandler = async () => {
    dispatch(savePost(postId));
    if (checkSaved) {
      setCheckSaved(false);
    } else {
      setCheckSaved(true);
    }
  };

  const deleteHandler = async () => {
    dispatch(deletePost(postId));
    setShowPostMenu(false);
    dispatch(getAllposts());
  };

  return (
    <ul className="post_menu" ref={menu}>
      <div onClick={() => saveHandler()}>
        {checkSaved ? (
          <li className="hover1">
            <i className="save_icon"></i>
            <div className="post_menu_text">
              <span>Unsave Post</span>
              <span className="menu_post_col">
                Remove this from your saved items.
              </span>
            </div>
          </li>
        ) : (
          <li className="hover1">
            <i className="save_icon"></i>
            <div className="post_menu_text">
              <span>Save Post</span>
              <span className="menu_post_col">
                Add this to your saved items
              </span>
            </div>
          </li>
        )}
      </div>

      {test && (
        <Link to={`/editPost/${postId}`}>
          <div>
            <li className="hover1">
              <i className="edit_icon"></i>
              <div className="post_menu_text">
                <span>Edit Post</span>
                <span className="menu_post_col"></span>
              </div>
            </li>
          </div>
        </Link>
      )}

      {showEditPopup && (
        <>
          <EditPost user={user} />
        </>
      )}

      {test && (
        <div onClick={() => deleteHandler()}>
          <li className="hover1">
            <i className="trash_icon"></i>
            <div className="post_menu_text">
              <span>Delete Post</span>
              <span className="menu_post_col">delete the post</span>
            </div>
          </li>
        </div>
      )}
    </ul>
  );
}
