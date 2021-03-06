import React, { Component } from "react";
import "../App.css";
import SearchBar from "./SearchBar";
import Nav from "./Nav";
import Tags from "./Tags";
import Card from "./Card";
import axios from 'axios';
import Thumb from '../images/ph.png';
import firebase from 'firebase';
import app from '../base';
import arw from '../images/arw.png'

class Saved extends Component {
    constructor(props) {
        const user = firebase.auth().currentUser;
        super(props)
        this.state = {
            title: '',
            description: '',
            image_link: Thumb,
            file_link: '',
            username: '',
            data: [],
            dlt: 'hidden',
            edit: 'hidden',
            user: user.displayName,
            saved: ''
        }
    }

    componentDidMount() {
        axios.get('/api/saved/' + this.state.user)
        .then(res => {
            console.log(res.data[0].saved)
            this.setState({
                saved: res.data[0].saved
            })
            console.log(this.state.saved)
            axios.get('/api/saved%/'+ this.state.saved)
            .then(res => {
                console.log(res)
                this.setState({
                    data: res.data
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    render() {
        const { data, dlt, edit, user } = this.state
        return (
            <div>
                <div className='userDiv'>
                    <button className='signout' onClick={() => app.auth().signOut()}><img title='sign out' className='so' src={arw} alt=''/></button>
                    <p>{user}</p>
                </div>
                <Tags />
                <SearchBar />
                <Nav />
                {data.map( card => {
                    return <Card card={card} dlt={dlt} edit={edit} />
                })}
            </div>
        )
    }
    
};

export default Saved;
