import React, {  useState } from "react";
export default function ImagePreview({ user, text, setText, image, setImage }) {
  return (
    <div className="overflow_a">
      <div className="add_pics_wrap">
        {image && (
          <div className="add_pics_inside1 p0">
            <div
              className="small_white_circle"
              onClick={() => {
                setImage("");
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div className="preview1">
              <img src={image} alt="" />
            </div>
          </div>
        ) }
      </div>
    </div>
  );
}
