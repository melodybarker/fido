import React, {useContext, useEffect} from "react"
import {MessageContext} from "./MessageProvider"
import {useHistory} from "react-router-dom"
import "./Message.css"

export const MessageList = () => {

  const history = useHistory()
  const {messages, getMessages} = useContext(MessageContext)

  useEffect(() => {
    console.log("MessageList: useEffect - getMessages")
    getMessages()
  }, [])

  return (
    <>
    <h3>Messages</h3>
    <button onClick={() => history.push("/messages/send")}>
      Send A Message
    </button>
    <div className="messagesReceived">
      {messages.map((message) => {
        return (
          <div className="message" key={message.id} id={`message--${message.id}`}>
          <div className="messageRecipient">
            <b>Recipient: </b>{message.user.name}
          </div>
          <div className="messageBody">
            <i>{message.message}</i>
          </div>
          <div className="messageDate">
            <b>Date Sent: </b>{message.sendDate}
          </div>
          </div>
        )
      })}
    </div>
    </>
  )
}
