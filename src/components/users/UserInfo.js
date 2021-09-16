import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {DogList} from "../dogs/DogList"
import {DogContext} from "../dogs/DogProvider"
import { UserContext } from "./UserProvider";

export const UserInfo = () => {
  const history = useHistory();
  const { users, getUsers, getUserById } = useContext(UserContext);
	const { dogs } = useContext(DogContext)
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
	const [show, setShow] = useState(false)
  const currentUserId = parseInt(localStorage.getItem("fido_user"));
	const myDogs = dogs.filter(dog => dog.currentUserId === parseInt(currentUserId))

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
		return (myDogs)
	}

  return (
    <>
      <h3>Account Info</h3>
      <section className="users">
        <div className="user-group">
          <div class="user_name">Name: {user.name}</div>
          <div class="user_email">Email: {user.email}</div>
          <div class="user_location">Location: {user.location}</div>
          <button
            className="editUser"
            onClick={() => {
              history.push(`/users/edit/${user.id}`);
            }}
          >
            Edit Info
          </button>
        </div>
      </section>

    </>
  );
};
