import React, { useCallback } from "react";
import Nav from "./Nav";
import SearchBar from "./SearchBar";
import app from '../base';
import "../App.css";
import { withRouter } from 'react-router';

const Signup = ({ history }) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password, displayName} = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then( res => {
                    return res.user.updateProfile({
                        displayName: displayName.value
                    })
                });
            history.push('/');
        } catch (error) {
            alert(error)
        }
    }, [history]);

    return (
        <div>
            <SearchBar />
            <Nav />
            <form onSubmit={handleSignUp} className="signUpForm">
                <p className="usernameLabel">username</p>
                <input name='displayName' id='username' type='text'></input>
                <p>email</p>
                <input name='email' id='email' type="email"></input>
                <p>password</p>
                <input name='password' id='password' type="password"></input>
                <p>repeat password</p>
                <input className="passwordInput" type="password"></input>
                <button type='submit' id='signup'>sign up</button>
            </form>
        </div>
    )
}

export default withRouter(Signup);