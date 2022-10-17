import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Picker from "emoji-picker-react";
import { comment } from "../../features/post/postSlice";
import { ClipLoader } from "react-spinners";

export default function CreateComment({ postId }) {
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  const [picker, setPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  const handleComment = async (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      const Data = {
        text: text,
        postId: postId,
        userId: user._id,
      };
      dispatch(comment(Data));
      setLoading(false);
      setText("");
    }
  };
  
  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img
          src={
            user?.profilePicture
              ? user.profilePicture
              : "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png"
          }
        />
        {user?.username}
        <div className="comment_input_wrap">
          <input
            type="text"
            ref={textRef}
            value={text}
            placeholder="Write a comment..."
            onChange={(e) => setText(e.target.value)}
            onKeyUp={handleComment}
          />
          <div className="comment_circle" style={{ marginTop: "5px" }}>
            <ClipLoader size={20} color="#1876f2" loading={loading} />
          </div>
          <div
            className="comment_circle_icon hover2"
            onClick={() => {
              setPicker((prev) => !prev);
            }}
          >
            <i className="emoji_icon"></i>
          </div>
          {picker && (
            <div className="comment_emoji_picker">
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
