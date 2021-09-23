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
  const currentUserId = parseInt(localStorage.getItem("fido_user"));
  const myDogs = dogs.filter(
    (dog) => dog.currentUserId === parseInt(currentUserId)
  );

  useEffect(() => {
    if (currentUserId) {
      getUserById(parseInt(currentUserId)).then((user) => {
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
        <label className="user-group">Account Info</label>
        <div className="user_name">Name: {user.name}</div>
        <div className="user_email">Email: {user.email}</div>
        <div className="user_location">Location: {user.location}</div>
        <button
          className="editUser"
          onClick={() => {
            history.push(`/users/edit/${user.id}`);
          }}
        >
          Edit Info
        </button>
      </section>
    </>
  );
};
