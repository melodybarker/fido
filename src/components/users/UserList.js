import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import { DogContext } from "../dogs/DogProvider"
import { useHistory, useParams } from "react-router-dom"

export const UserList = (props) => {
    const { users, getUsers } = useContext(UserContext)
    const { dogs } = useContext(DogContext)
    const history = useHistory()
    const [isLoading, setIsLoading] = useState([])

    useEffect(() => {
        console.log("UserList: useEffect - getUsers")
        getUsers()
    }, [])
    const [user, setUsers] = useState("")
const {usersId} = useParams()

    return (
      <>
        <section className="users">
        <button onClick={() => {history.push(`/messages/user/${usersId}`)}}>
            Message {props.user.name}
          </button>
          <div className="user__email">Email: { props.user.email }</div>
        </section>
      </>
    )
    }
