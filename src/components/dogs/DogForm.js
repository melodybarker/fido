import React, { useContext, useEffect, useState } from "react";
import { DogContext } from "./DogProvider";
import {genders, breeds, locations} from "./DogList"
import { UserContext } from "../users/UserProvider";
import { useHistory, useParams } from "react-router";
import "./Dog.css"

export const DogForm = () => {
  const { dogs, addDogs, getDogById, updateDog } = useContext(DogContext);
  const { users, getUsers } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const breed = breeds
  const location  = locations
  const gender = genders

  // setting the date to show MM/DD/YYYY
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  const currentDate = month + "/" + day + "/" + year;

  // for editing dog, grabs state of current animal
  const [dog, setDog] = useState({
    userId: 0,
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

  //reach out and gets state on initialization. component is ran after it's rendered. calls it after performing DOM update.
  // useEffect(() => {
  //   if (dogId) {
  //     getDogById(parseInt(dogId)).then((dog) => {
  //       setDog(dog);
  //       setIsLoading(false);
  //     });
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, []);

  useEffect(() => {
    getUsers().then(() => {
      if(dogId) {
        getDogById(parseInt(dogId))
        .then(dog => {
          setDog(dog)
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    })
  }, [])

  // when a field changes, re-render and display based on value of state
  const handleControlInputChange = (event) => {
    // when changing state or array, always create a copy, make changes, and then set state
    const newDog = { ...dog };
    // dog is an object with properites. set the property to the new value using object bracket notation
    newDog[event.target.id] = event.target.value;
    // update state
    setDog(newDog);
  };

  const handleSaveDog = (event) => {
    const userId = parseInt(localStorage.getItem("fido_user"));

    // this function passes through an existing dog and it's ID to edit/update dog's information
    if (dogId) {
      updateDog({
        id: dog.id,
        userId: parseInt(dog.userId),
        lost: dog.lost,
        url: dog.url,
        name: dog.name,
        gender: dog.gender,
        location: dog.location,
        breed: dog.breed,
        date: currentDate,
        info: dog.info,
      }).then(() => history.push(`/dogs`));
    } else {
     // this function invokes addDog to pass in a new dog as arugment. changes the url and display new list
      const newDog = {
        userId: userId,
        lost: dog.lost,
        url: dog.url,
        name: dog.name,
        gender: dog.gender,
        location: dog.location,
        breed: dog.breed,
        date: currentDate,
        info: dog.info,
      }
      addDogs(newDog)
      .then(() => {
        history.push("/dogs")
      })
    }
  };

  return (
    <form className="dropdown">
      <h2 className="dogForm_title">Post a missing dog!</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Dog Name</label>
          <input
            type="text"
            required
            autoFocus
            className="form-control"
            id="name"
            name="name"
            placeholder="if unsure, put unknown"
            onChange={handleControlInputChange}
            value={dog.name}
/>
        </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
          <select
            require
            autoFocus
            className="form-control"
            id="lost"
            name="lost"
            value={dog.lost}
            onChange={handleControlInputChange}
          >
            <option value="Missing Status">Missing Status</option>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
            <option value="Reunited">Reunited</option>
          </select>
        </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
          <input
            type="text"
            className="url"
            id="url"
            placeholder="Add a picture"
            value={dog.url}
            onChange={handleControlInputChange}
          />
        </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
        <select
            require
            autoFocus
            className="form-control"
            id="breed"
            className="breed"
            defaultValue={dog.breed}
            onChange={handleControlInputChange}
          >
            {breed.map(b => {
              return (
                  <option value={b} key={b.id}>{b}</option>
              )
            })}
          </select>
        </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
          <select
          require autoFocus
            className="location"
            id="location"
            defaultValue={dog.location}
            onChange={handleControlInputChange}
            className="form-control"
          > {location.map(l => {
            return (
                <>
                  <option key={l.id} value={l.id}>{l}</option>
                </>
              );
          })}
          </select>
        </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
          <select
            required
            autoFocus
            className="form-control"
            id="gender"
            className="gender"
            placeholder="gender"
            defaultValue={dog.gender}
            onChange={handleControlInputChange}>
            {gender.map(g => {
              return (
                <option value={g} key={g}>{g}</option>
              )
            })}
          </select>
        </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
          <input
            type="text"
            required
            autoFocus
            className="form-control"
            id="info"
            className="info"
            placeholder="Add additional info..."
            value={dog.info}
            onChange={handleControlInputChange}
          />
        </div>
        </fieldset>
        <fieldset>
        <button
          className="saveButton"
          disabled={isLoading}
          onClick={(e) => {
            e.preventDefault();
            handleSaveDog();
          }}
        >
          {dogId ? <>Save Pet</> : <>Find My Pet</>}
        </button>
      </fieldset>
    </form>
  );
};
