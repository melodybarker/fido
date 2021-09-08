import React from "react";
import { Route } from "react-router-dom";
import { UserProvider } from "./components/users/UserProvider"
import { UserInfo } from "./components/users/UserInfo"
import { DogProvider } from "./components/dogs/DogProvider";
import { DogList } from "./components/dogs/DogList"

export const ApplicationViews = () => {
	return (
		<>
		<UserProvider>
			<Route exact path="/">
				<UserInfo />
			</Route>
		</UserProvider>

		<DogProvider>
			<Route exact path="/dogs/missing">
				<DogList />
			</Route>
		</DogProvider>
		</>
	)
}