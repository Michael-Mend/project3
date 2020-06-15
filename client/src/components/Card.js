import React, { Component } from "react";
import '../App.css';
import expand from '../images/new2.png';
import axios from 'axios';
import firebase from 'firebase';
import Comment from './Comment';
import { Link } from "react-router-dom";

class Card extends Component {
    constructor(props) {
        const user = firebase.auth().currentUser;

        super(props) 

        this.state = {
           class: 'hidden',
           comment: '',
           username: user.displayName,
           postID: this.props.card._id,
           res: [],
           following: [],
           commentCard: 'hidden',
           commentSubmited: 'hidden',
           commentName: 'hidden'
        }
    }

    componentDidMount() {
        axios.get('/api/comment/' + this.state.postID)
        .then(res => {
            const data = res.data
            this.setState({
                res: data
            })
        })
        .catch(err => {
            console.log(err)
        }) 
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        axios.post('/api/comment', this.state)
        .then(res => {
            this.setState({
                commentSubmited: 'commentSubmited',
                newComment: this.state.comment,
                commentCard: 'commentCard',
                commentName: 'commentName',
                comment: ''
            })
        })
        .catch(err => {
            console.log(err)
        }) 
    }

    expand = () => {
       this.setState({class: 'expanded'})
    }
    close = () => {
        this.setState({class: 'hidden'})
    }

    delete = e => {
        e.preventDefault()
        axios.delete('/api/delete/' + this.props.card._id)
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

    follow = e => {
        e.preventDefault()
        this.setState({
            following: this.props.card.username
        })
        axios.put('/api/follow/' + this.state.username, this.state)
            .then(res => {
                console.log(res)
            })
    }
    save = e => {
        e.preventDefault()
        this.setState({
            saved: this.props.card._id
        })
        axios.put('/api/save/' + this.state.username, this.state)
            .then(res => {
                console.log(res)
            })
    }
    
    render() {
        const { comment, res } = this.state
        return (
            <div className='cardMain'>
                <div className='expand'>
                    <button onClick={this.expand}><img  src={expand} alt=''/></button>
                    <div className={this.state.class}>
                        <div>
                            <button onClick={this.close}>close</button>
                            <h3 className='title0'>{this.props.card.title}</h3>
                        </div>
                        <div>
                            <img alt={this.props.card.title} src={this.props.card.image_link}/>
                            <div className='postBody'>
                                <p>{this.props.card.description}</p>
                                <div className='qLinks'>
                                    <a href={this.props.card.image_link} target='_blank' rel="noopener noreferrer">image link</a>
                                    <a href={this.props.card.file_link} target='_blank' rel="noopener noreferrer">file link</a>
                                </div>
                            </div>
                        </div>
                        
                        <form className='newComment' onSubmit={this.submitHandler}>
                            <textarea 
                                name='comment' 
                                value={comment} 
                                placeholder='add a comment...'
                                onChange={this.changeHandler}
                                ></textarea>
                            <button type="submit" className="submitCmnt">submit comment</button>
                        </form>
                        <h2 id='commentSubmited' className={this.state.commentSubmited}>comment submited!</h2>
                        <h3>Comments</h3>
                        <div className={this.state.commentCard}>
                            <p className={this.state.commentName}>{this.state.username}</p>
                            <p className={this.state.commentCard} >{this.state.newComment}</p>
                        </div>
                        {res.map( comment => {
                            return <Comment key={comment._id} comment={comment}/>
                        })}
                    </div>
                </div>
                <div className='card'>
                    <img className='thumb' alt={this.props.card.title} src={this.props.card.image_link}/>
                    <div> 
                        <div className='titleDiv'>
                            <Link to={'/profile/' + this.props.card.username} className='usrnm'> {this.props.card.username} </Link>
                            <h3 className='title'>{this.props.card.title}</h3>
                            <Link className={this.props.edit} to={"edit/" + this.state.postID} >edit</Link>
                            <button className={this.props.dlt} onClick={this.delete}>delete</button>
                        </div>
                        <div className='postLinks'> 
                            <button onClick={this.follow} className='postLink'>follow</button>
                            <button onClick={this.save} className='postLink'>save</button>
                            <button onClick={this.report} className='postLink0'>report</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

 export default Card;