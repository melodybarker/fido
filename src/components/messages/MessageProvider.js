import React, { useState, createContext } from "react";

export const MessageContext = createContext();
export const MessageProvider = (props) => {
  const [messages, setMessages] = useState([]);

  const getMessages = () => {
    return fetch("http://localhost:8088/messages")
      .then((res) => res.json())
      .then(setMessages);
  };

  const addMessages = (messageObj) => {
    return fetch("http://localhost:8088/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageObj),
    })
    .then(getMessages);
  };

  // send message to specific user
  const messageUser = (user) => {
    return fetch(`http://localhost"8088/messages/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(getMessages);
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        getMessages,
        addMessages,
        messageUser,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};
