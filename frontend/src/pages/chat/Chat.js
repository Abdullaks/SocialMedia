import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
// import GetSenter from "./GetSenter";
import SideBar from "../../components/chat/SideBar";
import Header from "../../components/header/index";


// import {
//   fetchChatsAction,
//   sentNewMessage,
// } from "../../Redux/Slices/chat/ChatSlice";
// import ChatBody from "./ChatBody";
import axios from "axios";
// import { baseUrl } from "../../utils/baseUrl";
// import io from "socket.io-client";
// import { ChatState } from "../../context/ChatContext";
// import { getSender, getSenderFull } from "./ChatLoagic";

const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

// const formSchema = Yup.object({
//   message: Yup.string().required("Description is required"),
// });

export default function Chat({ chats }) {
    const [serachResults, setSearchResult] = useState([]);
      const [open, setOpen] = useState(false);
    const formik = useFormik({
      initialValues: {
        message: "",
      },
      onSubmit: (values, { resetForm }) => {
        // const data = {
        //   content: values.message,
        //   chatId: selectedChat._id,
        // };
        // sentData(data);
        // resetForm({ values: "" });
      },
    //   validationSchema: formSchema,
      // handleChange:(e)=>{
      //   console.log('Ofiosie');
      //       sentedMessage(e.target.value)
      //   if(!typing(true)){
      //     setTyping(true);
      //     socket.emit('typing',selectedChat._id)
      //   }
      //   let lastTypingTime = new Date().getTime();
      //   let timerLength=3000;
      //   setTimeout(() => {
      //     let timeNow=new Date().getTime();
      //     let timeDiff=timeNow-lastTypingTime;
      //     if (timeDiff >= timerLength && typing) {
      //       socket.emit('stop typing', selectedChat._id)
      //       setTyping(false)

      //     }

      //   }, timerLength);
      // }
    });

  return (
    <>
<div className=" pt-4  pb-6">

<Header/>
</div>
      <div className="bg-gray-50 pt-10  pb-6">
        <div className=" lg:mr-20 lg:ml-20  ">
          <div class="container mx-auto shadow-lg rounded-lg">
            <div class="px-5 py-5 flex justify-between items-center bg-white border-b-2">
              {/* <div class="font-semibold text-2xl">GoingChat</div> */}
              <div class="w-1/4">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="search IRL"                
                  class="rounded-2xl bg-gray-100 py-3 px-5 w-full"
                    onClick={() => setOpen(true)}
                />
                <SideBar
                  open={open}
                  setOpen={setOpen}
                //   setSelectedChat={setSelectedChat}
                ></SideBar>
              </div>

              {/* <div class="text-center">
   <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-form" data-drawer-show="drawer-form" aria-controls="drawer-form">
   Show drawer form
   </button>
</div> */}
              {/* {selectedChat ? ( */}
              <div class="h-14 w-14 rounded-full  font-semibold flex items-center justify-center">
                <img
                  className="   rounded-full"
                  // src={
                  //   getSenderFull(userAuth, selectedChat?.users).profilePhoto
                  // }
                />
                {/* {selectedChat?.name} */}
              </div>
              {/* ) : null} */}
            </div>
            <div class="flex flex-row justify-between bg-white">
              <div class="flex flex-col w-2/5 border-r-2 overflow-y-auto">
                <div class="border-b-2 py-4 px-2">
                  <input
                    // ref={inputElm}
                    type="text"
                    placeholder="search chatting"
                    class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                    // value={searchTerm}
                    // onChange={serachHandler}
                  />
                </div>

                {/* {chats?( */}
                <div>
                  {/* {searchTerm.length < 1 ? ( */}
                    <div>
                      {chats?.map((chat) => (
                        <div
                        //   onClick={() => {
                        //     setSelectedChat(chat);
                        //     setNotification(
                        //       notification.filter(
                        //         (n) => n.chat._id !== chat._id
                        //       )
                        //     );
                        //     setsenter(
                        //       senter.filter(
                        //         (n) => n !== getSender(userAuth, chat.users)
                        //       )
                        //     );
                        //   }}
                          className=
                        //   {
                        //     selectedChat?._id == chat?._id
                        //       ? "bg-gray-300 hover:bg-gray-100"
                        //       :
                               "bg-white hover:bg-gray-100 "
                        //   }
                        >
                          {/* <GetSenter
                            key={chat._id}
                            logedUser={userAuth}
                            users={chat.users}
                            setsenter={setsenter}
                            senter={senter}

                            // serach={searchResult} //sh
                            // searchKeyWord={serachHandler}
                          ></GetSenter> */}
                        </div>
                      ))}
                    </div>
                  {/* ) : ( */}
                    <div>
                      {serachResults?.map((chat) => (
                        <div
                        //   onClick={() => {
                        //     setSelectedChat(chat);
                        //     setNotification(
                        //       notification.filter(
                        //         (n) => n.chat._id !== chat._id
                        //       )
                        //     );
                        //     setsenter(
                        //       senter.filter(
                        //         (n) => n !== getSender(userAuth, chat.users)
                        //       )
                        //     );
                        //   }}
                          className=
                        //   {
                        //     selectedChat?._id == chat?._id
                        //       ? "bg-gray-300 hover:bg-gray-100"
                        //       :
                               "bg-white hover:bg-gray-100 "
                        //   }
                        >
                          {/* <GetSenter
                            key={chat._id}
                            logedUser={userAuth}
                            users={chat.users}
                            setsenter={setsenter}
                            senter={senter}

                            // serach={searchResult} //sh
                            // searchKeyWord={serachHandler}
                          ></GetSenter> */}
                        </div>
                      ))}
                    </div>
                  {/* )} */}
                </div>

                {/* ):null} */}
              </div>
              <div class="w-full px-5 flex flex-col justify-between bg-gray-200 ">
                <div class="flex flex-col mt-5  scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 h-96 overflow-y-scroll ">
                  {/* <ChatBody messages={message} /> */}
                </div>

                {/* {selectedChat ? ( */}
                  <div class="py-8">
                    {/* {istyping ? <div>Loading...</div>:<></>} */}
                    {/* <input
    class="w-full bg-white  py-5 px-3 rounded-xl"
    type="text"
    placeholder="type your message here..."
    required
  /> */}
                    <form
                      onSubmit={formik.handleSubmit}
                      className="mt-1 flex min-w-sm m-auto"
                    >
                      <input
                        onBlur={formik.handleBlur("message")}
                        value={formik.values.message}
                        onChange={formik.handleChange("message")}
                        type="text"
                        name="text"
                        rows="5"
                        id="text"
                        className="shadow-sm focus:ring-indigo-500  h-14  mr-2 focus:border-indigo-500 block w-full p-2 border-1 sm:text-sm border-gray-300 rounded-md bg-white"
                        placeholder="type your message here..."
                        // required
                        // onKeyDown={formik.handleSubmit}
                      />

                      <button
                        type="submit"
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-black bg-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                          />
                        </svg>
                      </button>
                    </form>
                  </div>
                {/* ) : ( */}
                  <div className="h-32"></div>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
