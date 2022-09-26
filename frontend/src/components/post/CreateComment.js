import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import Picker from "emoji-picker-react";


export default function CreateComment() {
    const { user } = useSelector((state) => state.auth);
    const [text, setText] = useState("");
    const [picker, setPicker] = useState(false);
    const [cursorPosition, setCursorPosition] = useState();
    const textRef = useRef(null);
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
  return (
    <div className="create_comment_wrap">
        
        <div className="create_comment">
        {/* {user.username} */}
        <img src={user?.picture} alt="" />
        <div className="comment_input_wrap">
            <input type="text"
            ref={textRef}
            value={text}
            placeholder="Write a comment..."
            onChange={(e) => setText(e.target.value)} />
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
  )
}
