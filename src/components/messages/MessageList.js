import React, { useContext, useEffect } from "react";
import { MessageContext } from "./MessageProvider";
import { useHistory, useParams } from "react-router-dom";
import "./Message.css";

export const MessageList = () => {
  const history = useHistory();
  const { messages, getMessages } = useContext(MessageContext);

  useEffect(() => {
    console.log("MessageList: useEffect - getMessages");
    getMessages();
  }, []);

  return (
    <>
      <section className="MessageForm">
        <label className="MessageTitle">Messages</label>
        <button onClick={() => history.push("/messages/form")}>
          Send A Message
        </button>
        <div className="messagesReceived">
          {messages.map((message) => {
            return (
              <div
                className="message"
                key={message.id}
                id={`message--${message.id}`}
              >
                <div className="messageRecipient">
                  <b>Recipient: </b>
                  {message.userId}
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
          })}
        </div>
      </section>
    </>
  );
};
