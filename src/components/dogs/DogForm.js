import React, { useContext, useEffect, useState, Component } from "react";
import { DogContext } from "./DogProvider";
import { UserContext } from "../users/UserProvider";
import { useHistory, useParams } from "react-router";

export const DogForm = () => {
  const { addDogs, getDogById, updateDog, getDogs } =
    useContext(DogContext);
  const {users, getUsers} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  // setting the date to show MM/DD/YYYY
  const dateObj = new Date();
  const month = dateObj.getUTCDate() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const currentDate = month + "/" + day + "/" + year;

  const [dog, setDog] = useState({
    currentUserId: 0,
    lost: "",
    url: "",
    name: "",
    gender: "",
    location: "",
    breed: "",
    date: Date.now(),
    info: "",
  });

  const { dogId } = useParams();
  const history = useHistory();

  useEffect(() => {
    getUsers().then(() => {
      if (dogId) {
        getDogById(parseInt(dogId))
				.then((dog) => {
          setDog(dog);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  const handleControlInputChange = (event) => {
    const newDog = { ...dog };
    newDog[event.target.id] = event.target.value;
    setDog(newDog);
  };
  const handleSaveDog = (event) => {
    const currentUserId = parseInt(localStorage.getItem("fido_user"));

			if(dogId) {
				updateDog({
					id: dog.id,
					currentUserId: currentUserId,
					lost: dog.lost,
					url: dog.url,
      name: dog.name,
      gender: dog.gender,
      location: dog.location,
      breed: dog.breed,
      date: currentDate,
      info: dog.info
				})
				.then(() => history.push(`/dog/edit/${dog.id}`))
				} else {
    const newDog = {
      currentUserId: parseInt(dog.currentUserId),
      lost: dog.lost,
      url: dog.url,
      name: dog.name,
      gender: dog.gender,
      location: dog.location,
      breed: dog.breed,
      date: currentDate,
      info: dog.info
    };
    addDogs(newDog).then(() => {
      history.push("/dogs");
    });
	}
};

  return (
    <form className="dogForm">
      <h3 className="dogForm_title">Post a missing dog!</h3>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Dog Name</label>
          <input
            type="text"
            required autoFocusclassName="name"
            id="name"
            placeholder="if unsure, put unknown"
            defaultValue={dog.name}
            onChange={handleControlInputChange}
          />
        </div>

        <div className="form-group">
          <select
            className="lost"
            id="lost"
            defaultValue={dog.lost}
            onChange={handleControlInputChange}
          >
            <option value="Missing Status">Missing Status</option>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
            <option value="Reunited">Reunited</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="url">Add A Picture</label>
          <input
            type="text"
            className="url"
            id="url"
            defaultValue={dog.url}
            onChange={handleControlInputChange}
          />
        </div>

        <div className="form-group">
          <select
            className="breed"
            id="breed"
            defaultValue={dog.breed}
            onChange={handleControlInputChange}
          >
            <option value="All">Dog Breed</option>
            <option value="Unknown">Unknown</option>
            <option value="Australian Shepard">Australian Shepard</option>
            <option value="Basset Hound">Basset House</option>
            <option value="Beagle">Beagle</option>
            <option value="Bernese Mountain Dog">Bernese Mountain Dog</option>
            <option value="Border Collie">Border Collie</option>
            <option value="Boston Terrier">Boston Terrier</option>
            <option value="Bulldog">Bulldoge</option>
            <option value="Chihuahua">Chihuahua</option>
            <option value="Chow Chow">Chow Chow</option>
            <option value="Cocker Spaniel">Cocker Spaniel</option>
            <option value="Dachshund">Dachshund</option>
            <option value="Dalmatian">Dalmatian</option>
            <option value="German Shepherd">German Shepherd</option>
            <option value="Golden Retriever">Golden Retriever</option>
            <option value="Great Dane">Great Dane</option>
            <option value="Grey Hound">Grey Hound</option>
            <option value="Husky">Husky</option>
            <option value="Irish Setter">Irish Setter</option>
            <option value="Jack Russell Terrier">Jack Russell Terrier</option>
            <option value="Maltese">Maltese</option>
            <option value="Mix Breed">Mix Breed</option>
            <option value="Pit Bull">Pit Bull</option>
            <option value="Poodle">Poodle</option>
            <option value="Pug">Pug</option>
            <option value="Rottweiler">Rottweiler</option>
          </select>
        </div>

        <div className="form-group">
          <select
            name="location"
            id="location"
            defaultValue={dog.location}
            onChange={handleControlInputChange}
            className="locationOption"
          >
            <option value="last seen">Last Seen</option>
            <option value="Brentwood">Brentwood</option>
            <option value="Nashville">Nashville</option>
          </select>
        </div>

        <div className="form-group">
          <select
            name="gender"
            id="gender"
            defaultValue={dog.gender}
            onChange={handleControlInputChange}
            className="genderOption"
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>

        <button className="saveButton" disabled={isLoading} onClick={e => {e.preventDefault()
				handleSaveDog()}}>{dogId ? <>save Pet</> : <>Find My Pet</>}</button>
      </fieldset>
    </form>
  );
};
