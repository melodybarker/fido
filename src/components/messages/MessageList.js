import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { DogContext } from "../dogs/DogProvider"
import { UserContext } from "../users/UserProvider"
import { useHistory } from "react-router-dom";
import "./Message.css";

export const MessageList = (props) => {
  const history = useHistory();
  const [ showReceived, setShowReceived ] = useState(false)
  const {releaseMessage} = useContext(MessageContext)
  const [ showSent, setShowSent ] = useState(false)

  const showReceivedMessages = () => {
    setShowReceived(!showReceived)
    setShowSent(false)
  }

  const showSentMessages = () => {
    setShowSent(!showSent)
    setShowReceived(false)
  }
  const userId = parseInt(localStorage.getItem("fido_user"));

  const handleRelease = id => () => {
    releaseMessage(id)
      .then(() => {
        history.push("/")
      })
  }


  return (
    <>
      <section className="MessageForm">
        <label className="MessageTitle"><h3>Messages</h3></label>
        <button className="messageButton" onClick={() => history.push("/messages/form")}>
      Send A Message
    </button>
    <button className="messageButton" onClick={() => showReceivedMessages() }>
      Received Messages
    </button>
    <button className="messageButton" onClick={() => showSentMessages() }>
      Sent Messages
    </button>
        <div className="messagesReceived" hidden={showReceived ? "" : "hidden"} >
          {props.messages.map((message) => {
            if (message.usersId === userId) {
              return (
              <div
                className="message"
                key={message.usersId}
                id={`message--${message.usersId}`}>
                <div className="messageRecipient" value={message.usersId}>
                  <b>From: </b>
                  {message.user.name}
                </div>
                <div className="messageBody">
                  <i>{message.message}</i>
                </div>
                <div className="messageDate">
                  <b>Date Sent: </b>
                  {message.sendDate}
                </div>

              </div>
            );
            }
          })}
        </div>

        <div className="messagesReceived" hidden={showSent ? "" : "hidden"} >
          {props.messages.map((message) => {
            if (message.userId === userId) {
              return (
              <div
                className="message"
                key={message.usersId}
                id={`message--${message.usersId}`}>
                <div className="messageRecipient" value={message.usersId}>
                  <b>To: </b>
                  {message.users.name}
                </div>
                <div className="messageBody">
                  <i>{message.message}</i>
                </div>
                <div className="messageDate">
                  <b>Date Sent: </b>
                  {message.sendDate}
                </div>
              </div>
            );
            }
          })}
        </div>
      </section>
    </>
  );
};
