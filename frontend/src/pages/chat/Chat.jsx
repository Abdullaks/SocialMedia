import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import Header from "../../components/header";
import Conversation from "../../components/chat/conversation/Conversation";
import Message from "../../components/chat/message/Message";
import { useSelector } from "react-redux";
import axios from "axios";
import io from "socket.io-client";
import { ChatState } from "../../context/chatProvider";
const baseUrl = "http://localhost:8800";
const ENDPOINT = "http://localhost:8800";
var socket, selectedChatCompare;
export default function Chat() {
  const { user } = useSelector((state) => state.auth);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [newMessage, setNewMessage] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const scrollRef = useRef();
  const { notification, setNotification } = ChatState();
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    getAllConversations();
  }, [user._id, fetchAgain]);

  const getAllConversations = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/chat/` + user._id, {
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
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.conversationId._id
      ) {
        console.log("eifwi");
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        console.log(newMessageRecieved);
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  useEffect(() => {
    const getMessages = async () => {
      try {
        const conversationId = currentChat?._id;
        const res = await axios.get(
          `${baseUrl}/api/chat/allMessage/` + conversationId,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setMessages(res.data);

        socket.emit("join chat", currentChat._id);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
    selectedChatCompare = currentChat;
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post(`${baseUrl}/api/chat/newMessage`, message, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setMessages([...messages, res.data]);
      socket.emit("new message", res.data);
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
                        user={user}
                        own={message.sender === user._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <div className="search">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="chatMessageinput"
                      placeholder="message .."
                      required="true"
                    />
                  </div>
                  <div>
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
