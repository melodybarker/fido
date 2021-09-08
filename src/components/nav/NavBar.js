import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">User Page</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/dogs/missing">Post Missing Dogs</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/search">Search Lost/Found</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/reunions">Reunions</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/login">Logout</Link>
            </li>
        </ul>
    )
}
