import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import useClickOutside from '../../helpers/clickOutside';

export default function Cover({cover,visitor}) {
    const { user } = useSelector((state) => state.auth);
    const [showCoverMneu, setShowCoverMenu] = useState(false);
    const menuRef = useRef(null);
    useClickOutside(menuRef, () => setShowCoverMenu(false));

  return (
    <div className="profile_cover" 
    // ref={coverRef}
    >
    {/* {coverPicture && ( */}
      <div className="save_changes_cover">
        <div className="save_changes_left">
          <i className="public_icon"></i>
          Your cover photo is public
        </div>
        <div className="save_changes_right">
          <button
            className="blue_btn opacity_btn"
            // onClick={() => setCoverPicture("")}
          >
            Cancel
          </button>
          <button className="blue_btn "
        //    onClick={() => updateCoverPicture()}
           >
            {/* {loading ? <PulseLoader color="#fff" size={5} /> : "Save changes"} */}
          </button>
        </div>
      </div>
    {/* )}  */}
    <input
      type="file"
    //   ref={refInput}
      hidden
      accept="image/jpeg,image/png,image/webp,image/gif"
      // onChange={handleImage}
    />
    {/* {error && (
      <div className="postError comment_error cover_error">
        <div className="postError_error">{error}</div>
        <button className="blue_btn"
         onClick={() => setError("")}
         >
          Try again
        </button>
      </div>
    )} */}
    {/* {coverPicture && ( */}
      <div className="cover_crooper">
        {/* <Cropper
          image={coverPicture}
          crop={crop}
          zoom={zoom}
          aspect={width / 350}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          showGrid={true}
          objectFit="horizontal-cover"
        /> */}
      </div>
    {/* )} */}
    {/* {cover && !coverPicture && (
      <img src={cover} className="cover" alt="" ref={cRef} />
    )} */}
    {!visitor && (
      <div className="udpate_cover_wrapper">
        <div
          className="open_cover_update"
          onClick={() => setShowCoverMenu((prev) => !prev)}
        >
          <i className="camera_filled_icon"></i>
          Add Cover Photo
        </div>
        {showCoverMneu && (
          <div className="open_cover_menu" ref={menuRef}>
            <div
              className="open_cover_menu_item hover1"
            //   onClick={() => setShow(true)}
            >
              <i className="photo_icon"></i>
              Select Photo
            </div>
            <div
              className="open_cover_menu_item hover1"
            //   onClick={() => refInput.current.click()}
            >
              <i className="upload_icon"></i>
              Upload Photo
            </div>
          </div>
        )}
      </div>
     )} 
    {/* {show && (
      <OldCovers
        photos={photos}
        setCoverPicture={setCoverPicture}
        setShow={setShow}
      />
    )} */}
  </div>
  )
}
