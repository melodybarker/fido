import React, {useContext, useEffect, useState} from "react"
import {UserList} from "../users/UserList"
import {UserContext} from "../users/UserProvider"
import {MessageContext} from "./MessageProvider"
import {useHistory, useParams} from "react-router-dom"

export const MessageSearch = () => {
  const {users, getUsers, setSearch, searchUsers} = useContext(UserContext)
  const {messages, getMessages, messageUser, setMessages} = useContext(MessageContext)
  const [isLoading, setIsLoading] = useState(true);
  const [filteredUsers, setFiltered] = useState([])
  const history = useHistory()
  const {userId} = useParams()

  const [user, setUsers] = useState({
    usersId: 0,
    message: ""
  })

  useEffect(() => {
    console.log("UsersList: useEffect - getUsers")
    getUsers()
  }, [])

  useEffect(() => {
    if (searchUsers !== "") {
      const subset = users.filter(user => user.name.toLowerCase().includes(searchUsers.toLowerCase()))
      setFiltered(subset)
    } else {
      setFiltered(users)
    }
  }, [searchUsers, users])


  useEffect(() => {
    getUsers().then(() => {
      if (userId) {
        messageUser(parseInt(userId))
        .then(user => {
          setMessages(user)
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    })
    }, [])

  const inputChange = (event) => {
    // when object or array state is changed, always create a copy
    // and then set state
    const newMessage = { ...users };
    // message is an object with properties. set property to new value
    newMessage[event.target.id] = event.target.value;
    // updates state
    setUsers(newMessage);
  };
  const handleMessageUser = (event) => () => {
    const usersId = parseInt(users.name);
    const userId = parseInt(localStorage.getItem("fido_user"));

  // setting the date to show MM/DD/YYYY
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  const currentDate = month + "/" + day + "/" + year;

    if (userId) {
      messageUser ({
        id: messages.id,
        userId: userId,
        usersId: usersId,
        message: messages.message,
        sendDate: currentDate,
      }).then(() => history.push(`/message`))
    }}

  return (
    <>
    <section className="users">
    User Search:
    <input type="text" className="input--wide" onKeyUp={(event) => setSearch(event.target.value)} placeholer="Search for a user..."/>
      {
        filteredUsers.map(user => {
        return <UserList key={user.id} user={user} />
      })
      }
    </section>
    </>
  )
}