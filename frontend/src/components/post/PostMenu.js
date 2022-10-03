import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useOnClickOutside from "../../helpers/clickOutside";
// import { deletePost, savePost } from "../../functions/post";
import { deletePost, getAllposts, savePost } from "../../features/post/postSlice";
export default function PostMenu({ postUserId, setShowPostMenu, checkSaved ,postId }) {
  const { user } = useSelector((state) => state.auth);
  const [test, setTest] = useState(postUserId === user._id ? true : false);
  const menu = useRef(null);
  useOnClickOutside(menu, () => setShowPostMenu(false));
  const dispatch=useDispatch()
  const saveHandler = async () => {
    dispatch(savePost(postId))
    // if (checkSaved) {
    //   setCheckSaved(false);
      
    // } else {
    //   setCheckSaved(true);
    // }
  };
  
  const deleteHandler = async () => {
    console.log("clicked delete handler");
    console.log(postId);
    dispatch(deletePost(postId));
    setShowPostMenu(false);
    dispatch(getAllposts())
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
