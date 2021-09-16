import React, {useContext, useState, useEffect} from "react";
import {MessageContext} from "./MessageProvider";
import {UserContext} from "../users/UserProvider"
import {DogContext} from "../dogs/DogProvider"
import {useHistory} from "react-router-dom";

export const MessageForm = () => {
  const {saveMessage, getMessageById, updateMessage} = useContext(MessageContext);
  const {dogs, getDogs} = useContext(DogContext)
  const { users } = useContext(UserContext)
  // const [newMessage, setNewMessage] = useState([]);
  const [messages, setMessages] = useState({
    currentUserId: 0,
    userId: 0,
    dogId: 0,
    body: "",
    sendDate: Date.now()
  });

const history = useHistory();

useEffect(() => {
  getDogs()
})

const inputChange = (event) => {
  const newMessage = {...messages}
  newMessage[event.target.id] = event.target.value
  setMessages(newMessage)
};
const handleClickSaveMessage = id => () => {
  const userId = parseInt(messages.userId)
  const dogId = parseInt(messages.dogId)
  const currentUserId = parseInt(sessionStorage.getItem("fido_user"));
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const newDate = month + "/" + day + "/" + year;
  if (userId === 0){
    window.alert("Please select a friend.")
  } else {
    const newMessage = {
      currentUserId: currentUserId,
      userId: parseInt(messages.userId),
      dogId: parseInt(messages.dogId),
      body: messages.body,
      sendDate: newDate
    }
    saveMessage(newMessage)
      .then(() => {
        history.push("/messages")
      })
    }
  }
  return (
    <form className="messageForm">
      <h3 className="messageForm__title">Send a message:</h3>
      <fieldset>
        <div className="form-group">
          <label htmlFor="userId">Recipient: </label>
          <select
            name="user"
            id="userId"
            className="form-control"
            onChange={inputChange}>
            <option value="0">Select a user...</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="subject">Subject: </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                autoFocus
                className="form-control"
                placeholder=""
                defaultValue={messages.subject}
                onChange={inputChange}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="body">Message: </label>
              <input
                type="text"
                id="body"
                name="body"
                required
                autoFocus
                className="form-control"
                placeholder="Write message here..."
                defaultValue={messages.body}
                onChange={inputChange}
              />
            </div>
          </fieldset>
      <button className="btn btn-primary" onClick={handleClickSaveMessage(dogs.id)}>
            Send Message
        </button>
          <button onClick={() => history.push("/messages")}>Back</button>
  </form>
)
}
