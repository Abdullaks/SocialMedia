// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { editPost, getAPost } from "../../features/post/postSlice";

// export default function EditPost() {
//   const [text, setText] = useState("");
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getAPost(id)).then((res) => {
//       setText(res.data);
//     });
//   }, [id, dispatch]);

//   const onSubmit = async () => {
//     const data = {
//       text: text,
//       id,
//     };
//     //   dispatch(editPost(data));
//   };
//   const onChange = (e) => {
//     setText((text) => ({
//       ...text,
//       text: e.target.value,
//     }));
//   };

//   return (
//     <>
//       <section className="heading">
//         <h1>Edit post Caption</h1>
//       </section>
//       <section className="form">
//         <form onSubmit={onSubmit}>
//           <div className="form-group">
//             <input
//               type="text"
//               className="form-control"
//               id="text"
//               name="text"
//               value={text}
//               onChange={onChange}
//             />
//           </div>
//           <div className="form-group">
//             <button type="submit" className="btn ">
//               Edit
//             </button>
//           </div>
//         </form>
//       </section>
//     </>
//   );
// }                        
