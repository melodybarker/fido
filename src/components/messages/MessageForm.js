import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { UserContext } from "../users/UserProvider";
import { DogContext } from "../dogs/DogProvider";
import { useHistory, useParams } from "react-router-dom";

export const MessageForm = (props) => {
  const { messages, saveMessage, messageUser, addMessages } = useContext(MessageContext);
  const { dogs, getDogs, getDogById, setSearch, searchDogs } = useContext(DogContext);
  const { users, getUsers, getUserById } = useContext(UserContext);
  const history = useHistory();
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // setting the date to show MM/DD/YYYY
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  const currentDate = month + "/" + day + "/" + year;

  const [message, setMessages] = useState({
    usersId: 0,
    message: "",
    sendDate: Date.now()
  })

  // reach out to the world and get customers state and location state on initialization. If dogId is in the URL, then getDogById
  useEffect(() => {
    getUsers().then(() => {
      if (userId) {
        getUserById(parseInt(userId))
        .then(user => {
          setMessages(user)
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    })
    }, [])


  const inputChange = (event) => {
    // when object or array state is changed, always create a copy
    // and then set state
    const newMessage = { ...messages };
    // message is an object with properties. set property to new value
    newMessage[event.target.id] = event.target.value;
    // updates stte
    setMessages(newMessage);
  };
  const handleMessageUser = (event) => () => {
    const usersId = parseInt(message.usersId)
    const userId = parseInt(localStorage.getItem("fido_user"));

    if (usersId) {
      messageUser ({
        userId: userId,
        usersId: props.usersId,
        message: message.message,
        sendDate: currentDate,
      }).then(() => history.push("/dogs"));
    } else {
    const newMessage = {
      userId: userId,
      usersId: props.usersId,
      message: message.message,
      sendDate: currentDate
    }
    addMessages(newMessage)
    .then(() => {
      history.push("/")
    })
  }
}


  return (
    <>
      <form className="messageForm">
        <h3 className="messageForm__title">Send a message:</h3>
        <fieldset>
          <div className="form-group">
            <label htmlFor="usersId">Recipient: </label>
            <input
              type="text"
              id="usersId"
              name="usersId"
              required
              autoFocus
              className="form-control"
              placeholder=""
              value={props.usersName}
              onChange={inputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="message">Message: </label>
            <input
              type="text"
              id="message"
              className="message"
              required
              autoFocus
              className="form-control"
              placeholder="Write message here..."
              defaultValue={messages.message}
              onChange={inputChange}
            />
          </div>
        </fieldset>
        <button
          className="btn btn-primary" disabled={isLoading}
          onClick={handleMessageUser()}>
          {userId ? <>Message User</> : <>Send Message</>}
        </button>
        <button onClick={() => history.push("/")}>Back</button>
      </form>
    </>
  );
};