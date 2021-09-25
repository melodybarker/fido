import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import {DogList} from "../dogs/DogList"
import "./Login.css"

export const Login = props => {
    const email = useRef()
    const password = useRef()
    const existDialog = useRef()
    const history = useHistory()
    const [show, setShow] = useState(false)

    const showList = () => {
      setShow(!show)
    }

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }
    const existingPasswordCheck = () => {
		return fetch(`http://localhost:8088/users?password=${password.current.value}`)
			.then(res => res.json())
			.then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("fido_user", exists.id)
                    history.push("/")
                }})

				existingPasswordCheck()
				.then(exists => {
					if (exists) {
						localStorage.setItem("fido_user", exists.id)
						history.push("/")
          } else {
        existDialog.current.showModal()
			}})
    }

    return (
      <>
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Fido Alert!</h1><h3> Let us help find your dog!</h3>

                    <fieldset>
                      <button onClick={showList}>Search all missing dogs</button>
                      </fieldset>
                    <h2>Sign in:</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"><h3> Email </h3></label>

                        <input ref={email} type="email"
                            id="email"
                            className="form-control"
                            placeholder=""
                            required autoFocus />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="inputEmail"><h3> Password </h3></label>

                        <input ref={password} type="password"
                            id="password"
                            className="form-control"
                            placeholder=""
                            required autoFocus />
                    </fieldset>

                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
        {show ? <><DogList/></> : <></>}
        </>
    )
}

