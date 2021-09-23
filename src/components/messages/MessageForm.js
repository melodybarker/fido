import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { UserContext } from "../users/UserProvider";
import { DogContext } from "../dogs/DogProvider";
import { DogList } from "../dogs/DogList";
import { useHistory, useParams } from "react-router-dom";

export const MessageForm = () => {
  const { saveMessage, messageUser, addMessages } = useContext(MessageContext);
  const { dogs, getDogs, setSearch, searchDogs } = useContext(DogContext);
  const { users, getUsers, getUserById } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  // setting the date to show MM/DD/YYYY
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  const currentDate = month + "/" + day + "/" + year;

  const [messages, setMessages] = useState({
    userId: 0,
    usersId: 0,
    dogId: 0,
    body: "",
    sendDate: Date.now(),
  });

  const history = useHistory();
  const { userId } = useParams();

  useEffect(() => {
    getUsers().then(getDogs)
    .then(() => {
    if (userId) {
      getUserById(parseInt(userId)).then((user) => {
        setMessages(user)
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  })
  }, [userId]);

  const inputChange = (event) => {
    const newMessage = { ...messages };
    newMessage[event.target.id] = event.target.value;
    setMessages(newMessage);
  };
  const handleMessageUser = (event) => () => {
    const usersId = parseInt(users.Id);
    const dogId = parseInt(dogs.id);
    const userId = parseInt(localStorage.getItem("fido_user"));

    if (userId) {
      messageUser ({
        userId: parseInt(messages.userId),
        usersId: parseInt(messages.usersId),
        dogId: parseInt(messages.dogId),
        message: messages.message,
        sendDate: currentDate,
      }).then(() => history.push(`/messages/edit/${users.id}`));
    } else {
    addMessages({
      userId: userId,
      usersId: usersId,
      dogId: dogId,
      message: messages.message,
      date: currentDate,
    }).then(() => history.push("/messages"))
    }
  };

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
        <button
          className="btn btn-primary"
          onClick={handleMessageUser(dogs.id)}
        >
          Send Message
        </button>
        <button onClick={() => history.push("/")}>Back</button>
      </form>
    </>
  );
};
