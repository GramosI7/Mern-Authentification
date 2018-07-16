import React, { Component } from 'react';
import axios from "axios";
import {NavLink} from 'react-router-dom';
import { connect } from "react-redux";



class SingleCour extends Component {

    state = {
        coursId : []
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        axios.get(`/cours/${id}`)
            .then((response) => {
            console.log(response);
            this.setState({
                coursId : response.data
            }, () => console.log("State of SingleCours : ", this.state.coursId))
        })
            .catch((error) => {
            console.log(error);
        })
    }

    delete = () => {
        axios.get(`/cours/delete/${this.state.coursId._id}`)
            .then((response) => this.props.history.push("/cours"))
            .catch((error) => {
            console.log(error);
        })
    }

    render() {
        const {coursId} = this.state;
        const { isAuthenticated} = this.props.auth;

        const editLinkGuest = (
            <div>
                <NavLink to={`/cours/edit/${coursId._id}`} className="btn btn-primary">Edit</NavLink>
                &nbsp;
                <a onClick={this.delete} className="btn btn-danger">Delete</a>
            </div>
        )
        return (
        <div className="container">
        <br/>
            <h1>{coursId.title}</h1>
            <br/>
            <h3>Ecrit par {coursId.author}</h3>
            <br/>
            <p>{coursId.body}</p>
            
            {isAuthenticated ? editLinkGuest : null}
            
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
  })

export default  connect(mapStateToProps, null)(SingleCour);
