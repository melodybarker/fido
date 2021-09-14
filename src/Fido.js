import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./components/nav/NavBar";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { DogProvider } from "./components/dogs/DogProvider";
import { DogList } from "./components/dogs/DogList";

export const Fido = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("fido_user")) {
          return (
            <>
              <NavBar />
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

      <DogProvider>
    <Route exact path="/login">
      <Login />
      </Route>
      </DogProvider>

    <Route path="/register">
      <Register />
    </Route>


  </>
);
