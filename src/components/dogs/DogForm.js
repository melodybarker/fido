import React, { useContext, useEffect, useState } from "react";
import { DogContext } from "./DogProvider";
import { useHistory, useParams } from "react-router";

export const DogForm = () => {
	const { addDog, getDogById, updateDog, getDogs, saveDog } = useContext(DogContext)
	const [isLoading, setIsLoading] = useState(true)
	const currentUserId = parseInt(sessionStorage.getItem("fido_customer"))

	const [dog, setDog] = useState({
		currentUserId: currentUserId,
		lost: "",
		url: "",
		name: "",
		gender: "",
		location: "",
		breed: "",
		date: Date.now(),
		info: ""
	});

	const history = useHistory();
	useEffect(() => {
		getDogs()
	})

	const editDog = (e) => {
		const editPost = {...dog}
		editPost[e.target.id] = e.target.value
		setDog(editPost)
	}

	const dogClickEvent = id => () => {
	const currentUserId = parseInt(sessionStorage.getItem("fido_user"))

	// setting the date to show MM/DD/YYYY
	const dateObj = new Date();
	const month = dateObj.getUTCDate() + 1
	const day = dateObj.getUTCDate()
	const year = dateObj.getUTCFullYear()
	const currentDate = month + "/" + day + "/" + year;
	// conditional statement
	const newPost = {
		currentUserId: currentUserId,
		lost: dog.lost,
		url: dog.url,
		name: dog.name,
		gender: dog.gender,
		location: dog.location,
		breed: dog.breed,
		date: currentDate,
		info: dog.info
	}

	saveDog(newPost)
		.then(() => {
			history.push("/dogs")
		})
	}

	return (
		<form className="dogForm">
			<h3 className="dogForm_title">Post a missing dog!</h3>
			<fieldset>
				<div className="form-group">
					<option selected value="Missing Status">Missing Status</option>
					<option value="Lost">Lost</option>
					<option value="Found">Found</option>
					<option value="Reunited">Reunited</option>
				</div>
			</fieldset>
		</form>
	)
}