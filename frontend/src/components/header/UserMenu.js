import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
export default function UserMenu({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(0);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };
  return (
    <div className="mmenu">
      {visible === 0 && (
        <div>
          <Link to="/profile" className="mmenu_header hover3">
            <img src={user?.profilePicture} alt="" />
            <div className="mmenu_col">
              <span>
                {user?.username} 
              </span>
              <span>See your profile</span>
            </div>
          </Link>
         
          <div className="mmenu_splitter"></div>
          <div
            className="mmenu_item hover3"
            
          >
            <div className="small_circle">
              <i className="dark_filled_icon"></i>
            </div>
            <span>Display & Accessibility</span>
            
          </div>
          <div
            className="mmenu_item hover3"
            onClick={onLogout}
          >
            <div className="small_circle">
              <i className="logout_filled_icon"></i>
            </div>
            <span>Logout</span>
          </div>
        </div>
      )}
      
    </div>
  );
}
