import React, { useContext, useEffect, useState } from "react";
import { DogContext } from "./DogProvider";
import { Link, useHistory } from "react-router-dom";
import "./Dog.css";

export const DogList = (props) => {
  const { dogs, getDogs } = useContext(DogContext);
  const [dog, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
	const [show, setShow] = useState(false)
  const history = useHistory();
  const currentUserId = parseInt(localStorage.getItem("fido_user"));

		const showList = () => {
			if (currentUserId === parseInt(dog.currentUserId)) {
      setShow(!show)
    }}

  useEffect(() => {
    console.log("DogList: useEffect - getDogs");
    getDogs();
  }, []);

  // filter function
  const [searchParam] = useState(["breed"]);
  const [filterParam, setFilterParam] = useState(["All"]);

  useEffect(() => {
    fetch("http://localhost:8088/dogs")
      .then((res) => res.json())
      .then((result) => {
        setIsLoading(true);
        setItems(result);
      });
  });

  function search(items) {
    return items.filter((item) => {
      if (item.breed === filterParam) {
        return searchParam.some((newItem) => {
          return (
            items[newItem]
              .toString()
              .toLowerCase()
              .indexOf(dogs.toLowerCase()) > -1
          );
        });
      }
      if (filterParam === "All") {
        return searchParam.som((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(dogs.toLowerCase()) >
            -1
          );
        });
      }
    });
  }

  return (
    <>
		<fieldset className="DogListForm">
      <select
        onChange={(event) => {
          setFilterParam(event.target.value);
        }}
        className="filter_breed"
      >
        <option value="All">Filter By Breed</option>
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
      <span className="focus"></span>

      <h3 className="dogTitle">Search Missing Dogs</h3>
      <div className="DogList">
        {dogs.map((dog) => {
          return (
            <section className="dogPost" key={dog.id} id={`dog--${dog.id}`}>
              <div className="dog_lost">{dog.lost}</div>
              <img
                className="dog_url"
                src={dog.url}
                width="300px"
                height="350px"
              />

              <div className="dog_name">Name: {dog.name}</div>
              <div className="dog_breed">Breed: {dog.breed}</div>
              <div className="dog_gender">Gender: {dog.gender}</div>
              <div className="dog_location">Location: {dog.location}</div>
              <div className="dog_date">Date: {dog.date}</div>
              <div className="dog_info">Info: {dog.info}</div>
              <div className="currentUser">
                message user:
                <Link onClick={() => history.push("/dogs/message")}>
                  {dog.currentUserId}
                </Link>
              </div>
              <button onChange={showList} className="editDog"
                onClick={() => {
                  history.push(`/dogs/edit/${dog.id}`);
                }}
              >
                Edit
              </button>
            </section>

          );
        })}
				{show ? <><DogList/></> : <></>}
      </div>
			</fieldset>
    </>
  );
};

