export default function Contact({ user }) {
  return (
    <div className="contact hover3">
      <div className="contact_img">
        {/* <img src={user.profilePicture} alt="" /> */}
      </div>
      <span>
        {user ?.username}
         {/* {user.last_name} */}
      </span>
    </div>
  );
}
