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
			headers: {
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
		return fetch(`http://localhost:8088/dogs?{dogId}&_expand=user`)
		.then(res => res.json())
	}

  const releaseDog = dogId => {
    return fetch(`http://localhost:8088/dogs/${dogId}`, {
        method: "DELETE"
    })
        .then(getDogs)

  }

	return (
		<DogContext.Provider value={{
			dogs, getDogs, addDogs, updateDog, getDogById, releaseDog
		}}>
			{props.children}
		</DogContext.Provider>
	)
}