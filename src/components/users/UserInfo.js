import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { DogContext } from "../dogs/DogProvider";
import { MessageContext } from "../messages/MessageProvider"
import { MessageList } from "../messages/MessageList"
import { UserContext } from "./UserProvider";
import "./User.css";

export const UserInfo = (props) => {
  const history = useHistory();
  const { users, getUsers, getUserById } = useContext(UserContext);
  const { messages, getMessages } = useContext(MessageContext)
  const { dogs } = useContext(DogContext);
  const [user, setUser] = useState({});
  const userId = parseInt(localStorage.getItem("fido_user"));
  // Empty list to set filtered dogs and messages per User
  const [ myDogs, setMyDogs ] = useState([])
  const [ myMessages, setMyMessages ] = useState([])

  const filterDogs = () => {
    const filteredDogList = dogs.filter(
        (dog) => dog.userId === parseInt(userId)
      );

    setMyDogs(filteredDogList)
  }

  const filterMessages = () => {
    console.log(messages)
    const filteredMessageList = messages.filter(
        (message) => message.userId === userId || message.usersId === userId
      );
    setMyMessages(filteredMessageList)
  }
  useEffect(() => {
    if (userId) {
      getUserById(userId).then((user) => {
        setUser(user);
      });
    }

    getMessages().then(filterMessages)
    filterDogs()
  }, []);


  return (
    <>
    <fieldset className="usersInfo">
      <section className="users">
        <label className="user-group"><b>Account Info</b></label>
        <div className="user_name"><b>Name: </b>{user.name}</div>
        <div className="user_email"><b>Email: </b>{user.email}</div>
        <div className="user_location"><b>Location: </b>{user.location}</div>
        <MessageList messages={myMessages} />
      </section>
    </fieldset>
    </>
  );
};
