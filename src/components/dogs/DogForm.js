import React, { useContext, useEffect, useState } from "react";
import { DogContext } from "./DogProvider";
import { UserContext } from "../users/UserProvider";
import { useHistory, useParams } from "react-router";

export const DogForm = () => {
  const { addDogs, getDogById, updateDog } = useContext(DogContext);
  const { users, getUsers } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  // setting the date to show MM/DD/YYYY
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const year = new Date().getFullYear();
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
    if (dogId) {
      getDogById(parseInt(dogId)).then((dog) => {
        setDog(dog);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [dogId]);

  const handleControlInputChange = (event) => {
    const newDog = { ...dog };
    newDog[event.target.id] = event.target.value;
    setDog(newDog);
  };

  const handleSaveDog = (event) => {
    const userId = parseInt(localStorage.getItem("fido_user"));

    // this function passes through an existing dog and it's ID to edit/update dog's information
    if (dogId) {
      updateDog({
        id: dog.id,
        currentUserId: parseInt(dog.currentUserId),
        lost: dog.lost,
        url: dog.url,
        name: dog.name,
        gender: dog.gender,
        location: dog.location,
        breed: dog.breed,
        date: currentDate,
        info: dog.info,
      }).then(() => history.push(`/dogs/edit/${dog.id}`));
    } else {
     // this function invokes addDog to pass in a new dog
      addDogs({
        userId: userId,
        lost: dog.lost,
        url: dog.url,
        name: dog.name,
        gender: dog.gender,
        location: dog.location,
        breed: dog.breed,
        date: currentDate,
        info: dog.info,
      }).then(() => history.push("/dogs/search"));
    }
  };

  return (
    <form className="dogForm">
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
            defaultValue={dog.name}
            onChange={handleControlInputChange}
          />
        </div>

        <div className="form-group">
          <select
            require
            autoFocus
            className="form-control"
            id="lost"
            name="lost"
            defaultValue={dog.lost}
            onChange={handleControlInputChange}
          >
          <label htmlFor="missing">Missing Status</label>
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
            require
            autoFocus
            className="form-control"
            id="breed"
            name="breed"
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
            <label className="location">Last Seen</label>
            <option value="All">Location</option>
            <option value="Ashland, TN">Ashland, TN</option>
            <option value="Asheville, TN ">Asheville, TN</option>
            <option value="Brentwood, T">Brentwood, TN</option>
            <option value="Chattanooga, TN">Chattanooga, TN</option>
            <option value="Clarksville, TN">Clarksville, TN</option>
            <option value="Cookville, TN">Cookville, TN</option>
            <option value="Crossville, TN">Crossville, TM</option>
            <option value="Dickson, TN">Dickson, TN</option>
            <option value="Dunlap, TN">Dunlap, TN</option>
            <option value="Fairview, TN">Fairview, TN</option>
            <option value="Franklin, TN">Franklin, TN</option>
            <option value="Gallatin, TN">Gallatin, TN</option>
            <option value="Gatlinburg,TN">Gatlinburg, TN</option>
            <option value="Germantown, TN">Germantown, TN</option>
            <option value="Hendersonville, TN">Hendersonville, TN</option>
            <option value="Jackson, TN">Jackson, TN</option>
            <option value="Johnson City, TN">Johnson City, TN</option>
            <option value="Kingsport, TN">Kingsport, TN</option>
            <option value="Knoxville, TN">Knoxville, TN</option>
            <option value="La Vergne, TN">La Vergne, TN</option>
            <option value="Lynchburg, TN">Lynchburg, TN</option>
            <option value="Maryville, TN">Maryville, TN</option>
            <option value="Memphis, TN">Memphis, TN</option>
            <option value="Morristown, TN">Morristown, TN</option>
            <option value="Mt. Juliet, TN">Mt. Juliet, TN</option>
            <option value="Murfreesbor, TN">Murfreesboro, TN</option>
            <option value="Nashville, TN">Nashville, TN</option>
            <option value="Nolensville, TN">Nolensville, TN</option>
            <option value="Oak Ridge, TN">Oak Ridge, TN</option>
            <option value="Ooltewah, TN">Ooltewah, TN</option>
            <option value="Paris, TN">Paris, TN</option>
            <option value="Pigeon Forge, TN">Pigeon Forge, TN</option>
            <option value="Rogersville, TN">Rogersville, TN</option>
            <option value="Signal Mountain, TN">Signal Mountain, TN</option>
            <option value="Smyrna, TN">Smyrna, TN</option>
            <option value="Spring Hill, TN">Spring Hill, TN</option>
            <option value="Tullahoma, TN">Tullahoma, TN</option>
          </select>
        </div>

        <div className="form-group">
          <select
            required
            autoFocus
            className="form-control"
            id="gender"
            name="gender"
            placeholder="gender"
            defaultValue={dog.gender}
            onChange={handleControlInputChange}>
            <option value="All">Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name">Additional Info</label>
          <input
            type="text"
            required
            autoFocus
            className="form-control"
            id="info"
            name="info"
            placeholder="give more detail about your dog"
            defaultValue={dog.info}
            onChange={handleControlInputChange}
          />
        </div>

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
