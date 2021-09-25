import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { UserContext } from "../users/UserProvider";
import { DogContext } from "../dogs/DogProvider";
import { useHistory, useParams } from "react-router-dom";

export const MessageForm = () => {
  const { messages, saveMessage, messageUser, addMessages } = useContext(MessageContext);
  const { dogs, getDogs, getDogById, setSearch, searchDogs } = useContext(DogContext);
  const { users, getUsers, getUserById } = useContext(UserContext);
  const history = useHistory();
  const { usersId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // setting the date to show MM/DD/YYYY
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  const currentDate = month + "/" + day + "/" + year;

  const [dog, setDogs] = useState({
    userId: 0,
    usersId: 0,
    dogId: 0,
    message: "",
    sendDate: currentDate
  })

  const {dogId} = useParams()

  // reach out to the world and get customers state and location state on initialization. If dogId is in the URL, then getDogById
  useEffect(() => {
    getUsers().then(getDogs).then(() => {
      if (dogId) {
        getDogById(parseInt(dogId))
        .then(dog => {
          setDogs(dog)
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    })
    }, [])

  const inputChange = (event) => {
    const newMessage = { ...messages };
    newMessage[event.target.id] = event.target.value;
    setDogs(newMessage);
  };
  const handleMessageUser = (event) => () => {
    const usersId = parseInt(messages.usersId);
    const dogId = parseInt(messages.dogId);
    const userId = parseInt(localStorage.getItem("fido_user"));

    if (dogId) {
      messageUser ({
        userId: parseInt(userId),
        usersId: messages.user.name,
        dogId: parseInt(messages.dogId),
        message: messages.message,
        sendDate: currentDate,
      }).then(() => history.push(`/messages/user/${dog.id}`));
    } else {
    const newMessage = {
      userId: userId,
      usersId: usersId,
      dogId: dogId,
      message: messages.message,
      sendDate: currentDate
    }
    addMessages(newMessage)
    .then(() => {
      history.push("/messages")
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
              value={messages.usersId}
              onChange={inputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="dogId">Dog ID: </label>
            <input
              id="dogId"
              name="dogId"
              required
              autoFocus
              className="form-control"
              placeholder=""
              value={messages.dogId}
              onChange={inputChange}/>

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
          className="btn btn-primary"
          onClick={() => {handleMessageUser(messages.id)}}
        >
          Send Message
        </button>
        <button onClick={() => history.push("/")}>Back</button>
      </form>
    </>
  );
};
