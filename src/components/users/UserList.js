import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import { DogContext } from "../dogs/DogProvider"
import { useHistory, useParams } from "react-router-dom"
import {MessageForm} from "../messages/MessageForm"

export const UserList = (props) => {
    const { users, getUsers } = useContext(UserContext)
    const { dogs } = useContext(DogContext)
    const history = useHistory()
    const [isLoading, setIsLoading] = useState([])
    const {usersId} = useParams()
    const [ userSelected, setUserSelected ] = useState(false)


    useEffect(() => {
        console.log("UserList: useEffect - getUsers")
        getUsers()
    }, [])



    return (
      <>
        <section className="usersList">
        <button onClick={() => {setUserSelected(!userSelected)}}>
            Message {props.user.name}
          </button>
          <div className="user__email">Email: { props.user.email }</div>
        </section>

        {
          userSelected ? <MessageForm keyId={props.user.id} usersName={props.user.name} usersId={props.user.id} /> : ""
        }
      </>
    )
    }
