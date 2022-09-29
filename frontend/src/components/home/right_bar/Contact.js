export default function Contact({ user }) {
  return (
    <div className="contact hover3">
      <div className="contact_img">
        <img src={user?.profilePicture?user.profilePicture:" https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png "}   />
      </div>
      <span>
        {user ?.username}
         {/* {user.last_name} */}
      </span>
    </div>
  );
}
