import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./components/nav/NavBar";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register"

export const Fido = () => (
	<>
		<Route
			render={() => {
				if (localStorage.getItem("fido_customer")) {
					return (
						<>
							/*search option without logging in - "SearchForm"*/
							<NavBar />
							<ApplicationViews />
						</>
					)
				} else {
					return <Redirect to="/login" />
				}
			}}
	/>

		<Route path="/login">
			<Login />
		</Route>
		<Route path="/register">
			<Register />
		</Route>
	</>
)