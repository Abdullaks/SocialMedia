import { format } from "timeago.js";

export default function Comment({ comment }) {
  return (
    <div className="comment">
      <img
        src={comment?.commentBy?.profilePicture}
        alt=""
        className="comment_img"
      />
      <div className="comment_col">
        <div className="comment_wrap">
          <div className="comment_name">{comment?.commentBy?.username}</div>
          <div className="comment_text">{comment?.commentText}</div>
        </div>
        <div className="comment_actions">
          <span>
            {format(comment?.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
