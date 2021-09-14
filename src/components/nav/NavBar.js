import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
  const history = useHistory();
  const runLogout = () => {
    localStorage.clear();
    history.push("/login")
  }

    return (
      <>
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">User Page</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/dogs/post">Post Missing Dogs</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/dogs/search">Search Lost/Found</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/reunions">Reunions</Link>
            </li>
            <li className="navbar__item">
                <a className="navbar__link" onClick={runLogout}>Logout</a>
            </li>
        </ul>
        </>
    )
}
