import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import "./styles/dark.css";
import "./styles/icons/icons.css"; 
import ChatProvider from "./context/chatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChatProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ChatProvider>
  </React.StrictMode>
);
