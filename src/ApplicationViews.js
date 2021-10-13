import React from "react";
import { Route } from "react-router-dom";
import { UserProvider } from "./components/users/UserProvider";
import { UserInfo } from "./components/users/UserInfo";
import { UserList } from "./components/users/UserList"
import { DogProvider } from "./components/dogs/DogProvider";
import { DogList } from "./components/dogs/DogList";
import { DogForm } from "./components/dogs/DogForm";
import { MessageProvider } from "./components/messages/MessageProvider"
import { MessageForm } from "./components/messages/MessageForm";
import { MessageSearch } from "./components/messages/MessageSearch"

export const ApplicationViews = () => {
  return (
    <>
      <DogProvider>
        <UserProvider>
          <MessageProvider>
            <Route exact path="/">
              <UserInfo />
            </Route>
            <Route path="/dogs/post">
              <DogForm />
            </Route>
            <Route path="/dogs/edit/:dogId(\d+)">
              <DogForm />
            </Route>
            <Route exact path="/dogs">
              <DogList />
            </Route>
            <Route path="/messages/form">
              <MessageSearch />
            </Route>
            <Route exact path="/messages/dog/:usersId(\d+)">
              <MessageForm />
            </Route>
            <Route exact path="/messages/user/:usersId(\d+)">
              <UserList />
              <MessageForm />
            </Route>
          </MessageProvider>
        </UserProvider>
      </DogProvider>
    </>
  );
};
