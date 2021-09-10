import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "./UserProvider";

export const UserInfo = () => {
	const history = useHistory()
	const { users, getUsers, getUserById } = useContext(UserContext)

	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState(null)


	// if (user.currentUserId === 0)
	// console.log("error")

	const currentUserId = parseInt(sessionStorage.getItem("fido_customer"))


    // let user = users.find((user) => user.id === currentUserId)

    useEffect(() => {
		getUsers().then(() => {
			if(currentUserId) {
				getUserById(parseInt(currentUserId))
				.then(user => {
					setUser(users)
					setLoading(false)})
				} else {
					setLoading(false)
				}
			})
		}, [])

	// useEffect(() => {
	// 	console.log("UserInfo: useEffect - getUsers")
	// 	getUsers()
	// }, [])




	// useEffect(() => {
	// 	fetch("http://localhost:8088/users")
	// 	.then(res => res.json().then(y => {
	// 		setUser(y.user);
	// 		setLoading(false)
	// 	}))
	// }, []);

// if (loading) {
// 	return <div>Loading...</div>
// }
// if (!user) {
// 	return <div>anon user</div>
// } else {
// return <div>got user</div>
// }

	return (
		<>
			<h3>Account Info</h3>
			<section className="users">
				{users.map(user => {
					return (
						<div className="user-group">
						<div class="user_name">Name: {user.name}</div>
						<div class="user_email">Email: {user.email}</div>
						<div class="user_location">Location: {user.location}</div>
            <button className="editUser" onClick={() => {history.push(`/users/edit/${user.id}`)}}>Edit Info</button>
						</div>
					)
				})}
			</section>
		</>
	)
}
