import React, {useState, createContext} from "react";

export const DogContext = createContext()
export const DogProvider = (props) => {

	const [dogs, setDogs] = useState([])

	const getDogs = () => {
		return fetch("http://localhost:8088/dogs?_expand=user")
		.then(res => res.json())
		.then(setDogs)
	}

	const addDogs = (dogObj) => {
		return fetch("http://localhost:8088/dogs", {
			method: "POST",
			header: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(dogObj)
		})
		.then(getDogs)
	}

	const updateDog = dog => {
		return fetch(`http://localhost:8088/dogs/${dog.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(dog)
		})
		.then(getDogs)
	}

	const getDogById = (dogId) => {
		return fetch(`http://localhost:8088/dogs/${dogId}`)
		.then(res => res.json())
	}

	return (
		<DogContext.Provider value={{
			dogs, getDogs, addDogs, updateDog, getDogById
		}}>
			{props.children}
		</DogContext.Provider>
	)
}