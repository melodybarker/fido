import React from "react";
import { Route } from "react-router-dom";
import { UserProvider } from "./components/users/UserProvider"
import { UserInfo } from "./components/users/UserInfo"
import { DogProvider } from "./components/dogs/DogProvider";
import { DogList } from "./components/dogs/DogList"
import { DogForm } from "./components/dogs/DogForm"

export const ApplicationViews = () => {
	return (
		<>
    <DogProvider>
		<UserProvider>
			<Route exact path="/">
				<UserInfo />
			</Route>

      <Route path="/dogs/post">
        <DogForm />
      </Route>
			<Route exact path="/dogs/search">
				<DogList />
			</Route>
    </UserProvider>
		</DogProvider>
		</>
	)
}