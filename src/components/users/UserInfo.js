import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { DogList } from "../dogs/DogList";
import { DogContext } from "../dogs/DogProvider";
import { UserContext } from "./UserProvider";
import "./User.css";

export const UserInfo = () => {
  const history = useHistory();
  const { users, getUsers, getUserById } = useContext(UserContext);
  const { dogs } = useContext(DogContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const userId = parseInt(localStorage.getItem("fido_user"));
  const myDogs = dogs.filter(
    (dog) => dog.userId === parseInt(userId)
  );

  const showList = () => {
    if (userId === parseInt(localStorage.getItem("fido_user"))) {
      setShow(!show);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserById(parseInt(userId)).then((user) => {
        setUser(user);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const showDogs = () => {
    return myDogs;
  };

  return (
    <>
      <section className="users">
        <label className="user-group"><b>Account Info</b></label>
        <div className="user_name"><b>Name: </b>{user.name}</div>
        <div className="user_email"><b>Email: </b>{user.email}</div>
        <div className="user_location"><b>Location: </b>{user.location}</div>
      </section>
      {show ? <><DogList/></> : <></>}
    </>
  );
};
