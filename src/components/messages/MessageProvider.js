import React, { useState, createContext, useContext} from "react";
import {DogContext} from "../dogs/DogProvider"

export const MessageContext = createContext();
export const MessageProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const {dog, dogs} = useContext

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
  const messageUser = (dog) => {
    return fetch(`http://localhost:8088/messages/user/${dog.id}_expand=user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
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
