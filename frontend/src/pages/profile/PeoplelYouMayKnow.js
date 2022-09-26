import { Dots } from "../../svg";
import { stories } from "../../data/home";
export default function PeoplelYouMayKnow() {
  return (
    <div className="pplumayknow">
      <div className="pplumayknow_header">
        People You May Know
        <div className="post_header_right ppl_circle hover1">
          <Dots />
        </div>
      </div>
      <div className="pplumayknow_list">
        {stories.map((item, i) => (
          <div className="addfriendCard" key={i}>
            <div className="addfriend_imgsmall">
              <img src={item.profile_picture} alt="" />
              <div className="addfriend_infos">
                <div className="addfriend_name">
                  {item.profile_name.length > 11
                    ? `${item.profile_name.substring(0, 11)}...`
                    : item.profile_name}
                </div>
                <div className="light_blue_btn">
                  <img
                    src="../../../icons/addFriend.png"
                    alt=""
                    className="filter_blue"
                  />
                  Add Friend
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
