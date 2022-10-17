// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getAPost, editPost } from "../../functions/editPost";

// export default function EditPost() {
//   const [text, setText] = useState("");
//   const { id } = useParams();
// const {user} =useSelector((state) => state.auth);
//   const dispatch = useDispatch(); 
//   const navigate = useNavigate();
//   useEffect(() => {
//     getsinglePost()
//   }, [id]);


// const getsinglePost= async (req, res) => {
// const ePost =await getAPost(id,user.token);
//  setText(ePost);
// }


//   const onSubmit = async () => {
//         const response = await editPost( null, null, text,null,user._id,user.token,id);
//     console.log(response);
//     if (response === "ok") {
//       setText("");
//       navigate("/home");
//     } else {
//       console.log(response, "error");
//     }
//   };
//   return (
//     <>
//       <section className="heading">
//         <h1>Edit post Caption</h1>
//       </section>
//       <section className="form">
//           <div className="form-group">
//             <input
//               type="text" 
//               className="form-control"
//               id="text"
//               name="text"
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <button type="submit" className="btn " onClick={onSubmit}>
//               Edit
//             </button>
//           </div>
//       </section>
//     </>
//   );
// }
