import Moment from "react-moment";

export default function Comment({ comment }) {
  return (
    <div className="comment">
      <img src={comment?.commentBy?.profilePicture} alt="" className="comment_img" />
      <div className="comment_col">
        <div className="comment_wrap">
          <div className="comment_name">
            {comment?.commentBy?.username} 
          </div>
          <div className="comment_text">{comment?.commentText}</div>
        </div>
        <div className="comment_actions">
          <span>
            <Moment fromNow interval={60}>
              {comment?.commentAt}
            </Moment>
          </span>
        </div>
      </div>
    </div>
  );
}
