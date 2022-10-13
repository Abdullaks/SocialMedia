// import React from 'react'
// const reactsArray = [
//   // {
//   //   name: "like",
//   //   image: "../../../reacts/like.gif",
//   // },
//   // {
//   //   name: "love",
//   //   image: "../../../reacts/love.gif",
//   // },
//   // {
//   //   name: "wow",
//   //   image: "../../../reacts/wow.gif",
//   // },
//   // {
//   //   name: "haha",
//   //   image: "../../../reacts/haha.gif",
//   // },
//   // {
//   //   name: "sad",
//   //   image: "../../../reacts/sad.gif",
//   // },
//   // {
//   //   name: "angry",
//   //   image: "../../../reacts/angry.gif",
//   // },
// ];

// export default function ReactionPopup({ showReaction, setShowReaction, reactHandler }) {
//   return (
//     <>
//       {showReaction && (
//         <div
//           className="reacts_popup"
//           // onMouseOver={() => {
//           //   setTimeout(() => {
//           //     setShowReaction(true);
//           //   }, 500);
//           // }}
//           // onMouseLeave={() => {
//           //   setTimeout(() => {
//           //     setShowReaction(false);
//           //   }, 500);
//           // }}
//         >
//           {reactsArray.map((react, i) => (
//             <div
//               className="react"
//               key={i}
//               onClick={() => {reactHandler(react.name)}}
//             >
//               <img src={react.image} alt="" />
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }
