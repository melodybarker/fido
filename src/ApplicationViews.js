import React from "react";
import { Route } from "react-router-dom";
import { UserProvider } from "./components/users/UserProvider";
import { UserInfo } from "./components/users/UserInfo";
import { DogProvider } from "./components/dogs/DogProvider";
import { DogList } from "./components/dogs/DogList";
import { DogForm } from "./components/dogs/DogForm";
import { MessageProvider } from "./components/messages/MessageProvider"
import { MessageList } from "./components/messages/MessageList";
import { MessageForm } from "./components/messages/MessageForm";

export const ApplicationViews = () => {
  return (
    <>
      <DogProvider>
        <UserProvider>
          <MessageProvider>
            <Route exact path="/">
              <UserInfo />
              <MessageList />
            </Route>
            <Route path="/dogs/post">
              <DogForm />
            </Route>
            <Route path="/dogs/edit/:dogId(\d+)">
              <DogForm />
            </Route>
            <Route exact path="/dogs/search">
              <DogList />
            </Route>
            <Route path="/messages/form">
              <MessageForm />
            </Route>
          </MessageProvider>
        </UserProvider>
      </DogProvider>
    </>
  );
};
