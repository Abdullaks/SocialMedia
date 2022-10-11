import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import Header from "../../components/header";
import Conversation from "../../components/chat/conversation/Conversation";
import Message from "../../components/chat/message/Message";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Chat() {
  const { user } = useSelector((state) => state.auth);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const scrollRef = useRef();
  useEffect(() => {
    getAllConversations();
  }, [user._id]);

  const getAllConversations = async () => {
    try {
      const res = await axios.get("/api/chat/" + user._id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setConversations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const conversationId = currentChat?._id;
        const res = await axios.get("/api/chat/allMessage/" + conversationId, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitc');
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
console.log(message);
    // const receiverId = currentChat.members.find(
    //   (member) => member !== user._id
    // );

    // socket.current.emit("sendMessage", {
    //   senderId: user._id,
    //   receiverId,
    //   text: newMessage,
    // });

    try {
      const res = await axios.post("/api/chat/newMessage", message, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
useEffect(() => {
  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" placeholder="search" className="chatMenuInput" />
            {conversations.map((conversation) => (
              <div
                key={conversation._id}
                onClick={() => setCurrentChat(conversation)}
              >
                <Conversation conversation={conversation} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((message) => (
                    <div key={message._id} ref={scrollRef}>
                      <Message
                        message={message}
                        own={message.sender === user._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <div>

                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="chatMessageinput"
                    placeholder="message .."
                    />
                    </div>
                    <div>
                      
                  {/* <textarea
                    name=""
                    id=""
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="chatMessageinput"
                    placeholder="message .."
                  ></textarea> */}
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    send
                  </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <img src="" alt="" />
                <span className="noConversationText">
                  Open a conversation to start a chat.
                </span>
              </>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper"></div>
        </div>
      </div>
    </>
  );
}
