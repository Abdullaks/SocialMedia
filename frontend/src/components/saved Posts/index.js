import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { Dots, Public } from "../../svg";
import CreateComment from "./CreateComment";
// import ReactionPopup from "./ReactionPopup";
import Comment from "./Comment";
import PostMenu from "./PostMenu";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { getReacts, reactPost } from "../../functions/reactPost";
export default function SavedPosts({ post, profile, comments }) {
  const [showReaction, setShowReaction] = useState(false);
  const [showPostMenu, setShowPostMenu] = useState(false);
  const [commentsArray, setCommentsArray] = useState([]);
  const [showCreateComment, setShowCreateComment] = useState(false);
  const [count, setCount] = useState(1);
  const [reacts, setReacts] = useState();
  const [check, setCheck] = useState();
  const [total, setTotal] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    setCommentsArray(post?.Comments);
  }, [post, comments]);
  const showMore = () => {
    setCount((prev) => prev + 5);
  };
useEffect(() => {
  getPostReacts();
}, [post]); 

const getPostReacts = async () => {
  const res = await getReacts(post._id, user.token);
  setReacts(res.reacts);
  setCheck(res.check);
  setTotal(res.total);
};
  const reactHandler = async (type) => {
    reactPost(post._id, "like", user?.token);
    if (check == "like") {
      setCheck();
      let index = reacts.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotal((prev) => --prev);
      }
    } else {
      setCheck(type);
      let index = reacts.findIndex((x) => x.react == type);
      let index1 = reacts.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = ++reacts[index].count)]);
        setTotal((prev) => ++prev);
      } 
      if (index1 !== -1) {
        setReacts([...reacts, (reacts[index1].count = --reacts[index1].count)]);
        setTotal((prev) => --prev);
      }
    }
  };
  return (
    <div className="post" style={{ width: `${profile && "100%"}` }}>
      <div className="post_header">
        <Link
          to={`/profile/${post?.post?.user?.username}`}
          className="post_header_left"
        >
          <img
            src={
              post?.post?.user?.profilePicture
                ? post.post?.user.profilePicture
                : "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png"
            }
            alt=""
          />
          <div className="header_col">
            <div className="post_profile_name">
              {post?.post?.user?.username}
              <div className="updated_p">
                {post?.post?.type == "profilePicture" &&
                  `updated their profile picture`}
                {post?.post?.type == "cover" && `updated their cover picture`}
              </div>
            </div>
            <div className="post_profile_privacy_date">
              {format(post?.post?.createdAt)}
            </div>
          </div>
        </Link>
        <div
          className="post_header_right hover1"
          onClick={() => {
            setShowPostMenu((prev) => !prev);
          }}
        >
          <Dots color="#828387" />
        </div>
      </div>

      <>
        <div className="post_text">{post?.post?.text}</div>
        {post?.post?.images && post?.post?.images.length && (
          <div
            className={
              post.post?.images.length === 1
                ? "grid_1"
                : post.post?.images.length === 2
                ? "grid_2"
                : post.post?.images.length === 3
                ? "grid_3"
                : post.post?.images.length === 4
                ? "grid_4"
                : post.post?.images.length >= 5 && "grid_5"
            }
          >
            {post?.post?.images.slice(0, 5).map((image, i) => (
              <img
                src={image.url}
                key={i}
                alt="pls reload"
                className={`img-${i}`}
              />
            ))}
            {post?.post?.images.length > 5 && (
              <div className="more-pics-shadow">
                +{post?.post?.images.length - 5}
              </div>
            )}
          </div>
        )}
      </>
      <div className="post_infos">
        <div className="reacts_count">
          <div className="reacts_count_imgs">
            {reacts &&
              reacts
                .sort((a, b) => {
                  return b.count - a.count;
                })
                .map(
                  (react) =>
                    react.count > 0 && (
                      <img src={`../../../reacts/${react.react}.svg`} alt="" />
                    )
                )}
          </div>
          <div className="reacts_count_num">{total > 0 && total}</div>
        </div>
        {/* <div className="to_right">
          <div className="comments_count"> comments</div>
          <div className="share_count">1 share</div>
        </div> */}
      </div>
      <div className="post_actions">
        {/* <ReactionPopup
          showReaction={showReaction}
          setShowReaction={setShowReaction}
          // reactHandler={reactHandler}
        /> */}
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
          onClick={() => reactHandler(check ? check : "like")}
        >
          {check ? (
            <img
              src={`../../../reacts/${check}.svg`}
              alt=""
              className="small_react"
              style={{ width: "18px" }}
            />
          ) : (
            <i className="like_icon"></i>
          )}
          <span
            style={{
              color: `

          ${check === "like" ? "#4267b2" : ""}
          `,
            }}
          >
            {check ? check : "Like"}
          </span>
        </div>
        <div
          className="post_action hover1"
          onClick={() => setShowCreateComment(true)}
        >
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

        {/* {showCreateComment && <CreateComment postId={post.post._id} />}
        {commentsArray &&
          commentsArray
            .slice(0, count)
            .map((comment, i) => <Comment comment={comment} key={i} />)}
        {count < 5 && (
          <div className="view_comments" onClick={() => showMore()}>
            View more comments
          </div>
        )} */}
      </div>
      {showPostMenu && (
        <PostMenu
          setShowPostMenu={setShowPostMenu}
          postUserId={post.post.user._id}
          postId={post.post._id}
        />
      )}
    </div>
  );
}
