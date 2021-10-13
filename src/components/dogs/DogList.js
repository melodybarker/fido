import React, { useContext, useEffect, useState } from "react";
import { DogContext } from "./DogProvider";
import { UserContext } from "../users/UserProvider";
import { MessageContext } from "../messages/MessageProvider";
import { Link, useHistory, useParams} from "react-router-dom";
import "./Dog.css";

export const locations = [
  "Filter by Location",
  "Ashland, TN",
  "Asheville, TN",
  "Brentwood, TN",
  "Chattanooga, TN",
  "Clarksville, TN",
  "Cookville, TN",
  "Crossville, TN",
  "Dickson, TN",
  "Dunlap, TN",
  "Fairview, TN",
  "Franklin, TN",
  "Gallatin, TN",
  "Gatlinburg, TN",
  "Germantown, TN",
  "Hendersonville, TN",
  "Jackson, TN",
  "Johnson, TN",
  "Kingsport, TN",
  "Knoxville, TN",
  "La Vergne, TN",
  "Lynchburg, TN",
  "Maryville, TN",
  "Memphis, TN",
  "Morristown, TN",
  "Mt Juliet, TN",
  "Murfreesboro, TN",
  "Nashville, TN",
  "Nolensville, TN",
  "Oak Ridge, TN",
  "Ooltewah, TN",
  "Paris, TN",
  "Pigeon, TN",
  "Rogersville, TN",
  "Signal, TN",
  "Smyrna, TN",
  "Spring Hill, TN",
  "Tullahoma, TN",
];
export const breeds = [
  "Filter by Breed",
  "Unknown",
  "Australian Shepard",
  "Basset Hound",
  "Beagle",
  "Bernese Mountain Dog",
  "Blue Heeler",
  "Border Collie",
  "Boston Terrier",
  "Bulldog",
  "Chihuahua",
  "Chow Chow",
  "Cocker Spaniel",
  "Dachshund",
  "Dalmatian",
  "German Shepherd",
  "Golden Retriever",
  "Great Dane",
  "Grey Hound",
  "Husky",
  "Irish Setter",
  "Jack Russell Terrier",
  "Maltese",
  "Mix Breed",
  "Pit Bull",
  "Poodle",
  "Pug",
  "Rottweiler",
  "Westie",
];

export const genders = [
  "Filter by Gender",
  "Female",
  "Male"
  ];

export const DogList = (props) => {
  const { dogs, getDogs, releaseDog } = useContext(DogContext);
  const [dog, setDogs] = useState([]);
  // const { addMessages } = useContext(MessageContext);
  const [users, setUsers] = useState([]);
  const [messages, getMessages] = useState([]);

  // filter function
  const [searchParam] = useState(["breed"]);

  const [searchDog, setSearchDog] = useState("");
  const [filteredDogs, setFilteredDogs] = useState([]);

  const [show, setShow] = useState(false);
  const history = useHistory();
  const userId = parseInt(localStorage.getItem("fido_user"));
  const {usersId} = useParams()
  // show/hide list for login

  useEffect(() => {
    console.log("DogList: useEffect - getDogs");
    getDogs();
  }, []);

  useEffect(() => {
    setFilteredDogs(dogs);
  }, [dogs]);


  const handleBreed = (e) => {
    let DogBreed = [...filteredDogs];
    DogBreed = dogs.filter(
      (dog) => dog.breed === e.target.value
    );
    setFilteredDogs(DogBreed);
    FindDogs()
  }

  const handleLocation = (e) => {
  let DogLocation = [...filteredDogs];
  DogLocation = dogs.filter(
      (dog) => dog.location === e.target.value
    );
    setFilteredDogs(DogLocation)
    FindDogs()
  }
  const handleGender = (e) => {
    let DogGender = [...filteredDogs];
    DogGender = dogs.filter(
      (dog) => dog.gender === e.target.value
    )
    setFilteredDogs(DogGender)
    FindDogs()
  }
  // filter function
  const filterAllDogs = dog.filter(
    (d) =>
      d.breed.toLowerCase().includes(searchDog.toLowerCase()) &&
      d.location.toLowerCase().includes(searchDog.toLowerCase()) &&
      d.gender.toLowerCase().includes(searchDog.toLowerCase())
  );
  const FindDogs = () => {
    // grab value of breed dropdown
    // set an array that filters the choosen breed
    // set that array to filteredDogs
    return (
      <div className="filterDogs">
        {filterAllDogs.map((d) => (
          <dog key={dog} id={dog} dog={dog} />
        ))}
      </div>
    );
  };

  // setting the date to show MM/DD/YYYY
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  const currentDate = month + "/" + day + "/" + year;

  const handleRelease = id => () => {
    releaseDog(id)
      .then(() => {
        history.push("/dogs")
      })
  }

  return (
    <>
      <fieldset className="Filter">
      <div onChange={handleGender} className="DogFilter" value={genders}>
          <select id="DogGender" onChange={handleGender} className="DogFilter">
            {genders.map((gender) => {
              return <option value={gender}>{gender}</option>;
            })}
          </select>
        </div>
        <div onChange={handleLocation} className="DogFilter" value={locations}>
          <select id="DogLocation" onChange={handleLocation} className="DogFilter">
            {locations.map((location) => {
              return (
                <>
                  <option value={location}>{location}</option>
                </>
              );
            })}
          </select>
        </div>

        <div onChange={handleBreed} className="DogFilter" value={breeds}>
          <select id="DogBreed" onChange={handleBreed} className="DogFilter">
            {breeds.map((breed) => {
              return (
                <>
                  <option value={breed}>{breed}</option>
                </>
              );
            })}
          </select>
        </div>
      </fieldset>
      <fieldset className="DogForm">
        <h3 className="dogTitle">Search Missing Dogs</h3>
        <div className="DogList">
          {filteredDogs.map((dog) => {
            return (
              <section className="dogPost" key={dog.id} id={`dog--${dog.id}`}>
                <div className="dog_lost"><b>{dog.lost}</b></div>
                <img
                  className="dog_url"
                  src={dog.url}
                  width="300px"
                  height="350px"
                />

                <div className="dog_name"><b>Name: </b>{dog.name}</div>
                <div className="dog_breed"><b>Breed: </b>{dog.breed}</div>
                <div className="dog_gender"><b>Gender: </b>{dog.gender}</div>
                <div className="dog_location"><b>Location: </b>{dog.location}</div>
                <div className="dog_date"><b>Date: </b>{dog.date}</div>
                <div className="dog_info"><b>Info: </b>{dog.info}</div>
                <div className="currentUser">
                  <b>message user: </b>
                  <b><Link className="userPost" to={`/messages/dog/${dog.id}`}>
                    {dog.user.name}
                  </Link></b>
                </div>
                <button
                  className="editDog"
                  onClick={() => {
                    history.push(`/dogs/edit/${dog.id}`);
                  }}
                  hidden={dog.userId === userId ? "" : "hidden"}
                >
                  Edit Post
                </button>
              <button onClick={handleRelease(dog.id)} hidden={dog.userId === userId ? "" : "hidden"}>
                Remove Dog
              </button>
              </section>
            );
          })}
        </div>
      </fieldset>
    </>
  );
};
