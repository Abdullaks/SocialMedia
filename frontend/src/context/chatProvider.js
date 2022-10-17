import React, { createContext, useContext, useState } from "react";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  return (
    <ChatContext.Provider
      value={{
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
