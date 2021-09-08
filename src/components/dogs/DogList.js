import React, {useContext, useEffect} from "react";
import {DogContext} from "./DogProvider";
import "./Dog.css"


export const DogList = (props) => {

	const {dogs, getDogs} = useContext(DogContext)
	let currentUserId = parseInt(sessionStorage.getItem("fido_customer"))

	useEffect(() => {
		console.log("DogList: useEffect - getDogs")
		getDogs()
	}, [])

	return (
		<>
		<h3 className="dogTitle">Missing Dogs</h3>
		<div className="DogList">
			{dogs.map(dog => {
				return (
					<section className="dogPost" key={dog.id} id={`dog--${dog.id}`}>
						<div className="dog_lost">
							{dog.lost}
						</div>
						<img className="dog_url" src={dog.url} width="300px" height="350px" />

						<div className="dog_name">
							Name: {dog.name}
						</div>
						<div className="dog_breed">
							Breed: {dog.breed}
						</div>
						<div className="dog_gender">
							Gender: {dog.gender}
						</div>
						<div className="dog_location">
							location: {dog.location}
						</div>
						<div className="dog_date">
							Date: {dog.date}
						</div>
						<div className="dog_info">
							Info: {dog.info}
						</div>
						<div className="currentUser">
							user: {dog.currentUserId}
						</div>
					</section>
					)
				})
			}
			</div>
		</>
	)
}