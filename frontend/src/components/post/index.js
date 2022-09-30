import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { Dots, Public } from "../../svg";
import "./style.css";
import CreateComment from "./CreateComment";
import ReactionPopup from "./ReactionPopup";
import Comment from "./Comment";
export default function Post({ post, profile,comments }) {
  const [showReaction, setShowReaction] = useState(false);
  const [commentsArray, setCommentsArray] = useState([]);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    setCommentsArray(post?.Comments);
  }, [post, comments]);
  const showMore = () => {
    setCount((prev) => prev + 5);
  };
  return (
    <div className="post" style={{ width: `${profile && "100%"}` }}>
      <div className="post_header">
        <Link
          to={`/profile/${post?.user?.username}`}
          className="post_header_left"
        >
          <img
            src={
              post?.user?.profilePicture
                ? post.user.profilePicture
                : "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png"
            }
            alt=""
          />
          <div className="header_col">
            <div className="post_profile_name">
              {post?.user?.username}
              <div className="updated_p">
                {post?.type == "profilePicture" &&
                  `updated their profile picture`}
                {post?.type == "cover" && `updated their cover picture`}
              </div>
            </div>
            <div className="post_profile_privacy_date">
              <Moment fromNow interval={60}>
                {post?.createdAt}
              </Moment>
              {/* <Public color="#828387" /> */}
            </div>
          </div>
        </Link>
        <div className="post_header_right hover1">
          <Dots color="#828387" />
        </div>
      </div>

      <>
        <div className="post_text">{post?.text}</div>
        {post?.images && post?.images.length && (
          <div
            className={
              post.images.length === 1
                ? "grid_1"
                : post.images.length === 2
                ? "grid_2"
                : post.images.length === 3
                ? "grid_3"
                : post.images.length === 4
                ? "grid_4"
                : post.images.length >= 5 && "grid_5"
            }
          >
            {post?.images.slice(0, 5).map((image, i) => (
              <img
                src={image.url}
                key={i}
                alt="pls reload"
                className={`img-${i}`}
              />
            ))}
            {post?.images.length > 5 && (
              <div className="more-pics-shadow">+{post?.images.length - 5}</div>
            )}
          </div>
        )}
      </>
      <div className="post_infos">
        <div className="reacts_count">
          <div className="reacts_count_imgs"></div>
          <div className="reacts_count_num"></div>
        </div>
        {/* <div className="to_right">
          <div className="comments_count"> comments</div>
          <div className="share_count">1 share</div>
        </div> */}
      </div>
      <div className="post_actions">
        <ReactionPopup
          showReaction={showReaction}
          setShowReaction={setShowReaction}
        />
        <div
          className="post_action hover1"
          onMouseOver={() => {
            setTimeout(() => {
              setShowReaction(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setShowReaction(false);
            }, 500);
          }}
        >
          <i className="like_icon"></i>
          <span>Like</span>
        </div>
        <div className="post_action hover1">
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        <div className="post_action hover1">
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
      </div>
      <div className="comments_wrap">
        <div className="comments_order"></div>

        <CreateComment postId={post._id} />
        {commentsArray &&
          commentsArray
            .slice(0, count)
            .map((comment, i) => <Comment comment={comment} key={i} />)}
        {count < 5 && (
          <div className="view_comments" onClick={() => showMore()}>
            View more comments
          </div>
        )}
      </div>
    </div>
  );
}
