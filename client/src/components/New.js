import React, { Component } from "react";
import Nav from "./Nav";
import Tags from "./Tags";
import SearchBar from "./SearchBar";
import "../App.css";
import axios from 'axios';
import firebase from 'firebase';
import app from '../base';
import arw from '../images/arw.png'

class New extends Component {
    constructor(props) {
        const user = firebase.auth().currentUser;

        super(props) 

        this.state = {
            title: '',
            description: '',
            image_link: '',
            file_link: '',
            tag: '',
            username: user.displayName
        }
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post('/api/newpost', this.state)
        .then(res => {
            console.log(res)
        })
        .then(
            window.location.replace('/')
        )
        .catch(err => {
            console.log(err)
        }) 
    }

    render() {
        const { title, description, image_link, file_link, tag, username } = this.state
        return(
            <div>
                <div className='userDiv'>
                    <button className='signout' onClick={() => app.auth().signOut()}><img title='sign out' className='so' src={arw} alt=''/></button>
                    <p>{username}</p>
                </div>
                <Tags />
                <SearchBar />
                <Nav />
                <div className="newPost">
                    <h3>submit a post</h3>
                    <form onSubmit={this.submitHandler}>
                        <p>title</p>
                        <div>
                            <input 
                                type="text" 
                                name="title" 
                                value={title}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <p>tag</p>
                        <div>
                            <input
                                placeholder="optional"
                                type="text" 
                                name="tag" 
                                value={tag}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <div>
                            <p>image link</p>
                            
                        </div>
                        <div>
                            <input
                                placeholder="must be a direct image link"
                                type="text" 
                                name="image_link"
                                value={image_link}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <h7>we recommend using
                                <a href='https://imgur.com' target='_blank' rel="noopener noreferrer">
                                    imgur
                                </a> 
                            to host your image</h7> 
                        <p>file link</p>
                        <div>
                            <input
                                placeholder="optional"
                                type="text" 
                                name="file_link"
                                value={file_link}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <p>description</p>
                        <div>
                            <textarea
                                type="text" 
                                name="description" 
                                value={description}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <button type="submit">submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default New
