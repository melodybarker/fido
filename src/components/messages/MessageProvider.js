import React, { useState, createContext, useContext} from "react";
import {DogContext} from "../dogs/DogProvider"

export const MessageContext = createContext();
export const MessageProvider = (props) => {
  const [messages, setMessages] = useState([]);

  const getMessages = () => {
    return fetch("http://localhost:8088/messages?_expand=users&&_expand=user")
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
  const messageUser = (usersId) => {
    return fetch(`http://localhost:8088/messages/${usersId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usersId),
    }).then(getMessages);
  };

  const releaseMessage = messageId => {
    return fetch(`http://localhost:8088/messages/${messageId}`, {
        method: "DELETE"
    })
        .then(getMessages)

  }

  return (
    <MessageContext.Provider
      value={{
        messages,
        getMessages,
        addMessages,
        messageUser,
        releaseMessage
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};
