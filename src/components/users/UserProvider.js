import React, {useState, createContext} from "react";

export const UserContext = createContext()

export const UserProvider = (props) => {
	const [users, setUsers] = useState([])
  const [loading, setLoading] = useState([])
  const [searchUsers, setSearch] = useState("")

	const getUsers = () => {
		return fetch ("http://localhost:8088/users")
			.then(res => res.json())
			.then(setUsers)
	}

	const addUsers = userObj => {
		return fetch("http://localhost:8088/users", {
			method: "POST",
			header: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(userObj)
		})
		.then(getUsers)
	}

// edit user's information
	const messageUser = user => {
		return fetch(`http://localhost"8088/users/${user.id}`, {
			method: "PUT",
			header: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(user)
		})
		.then(getUsers)
	}

	const getUserById = (usersId) => {
		return fetch(`http://localhost:8088/users/${usersId}`)
			.then(res => res.json())
	}

	return (
		<UserContext.Provider value={{
			users, setUsers, getUsers, addUsers, messageUser, getUserById, loading, setLoading, searchUsers, setSearch
		}}>
			{props.children}
		</UserContext.Provider>
	)
}