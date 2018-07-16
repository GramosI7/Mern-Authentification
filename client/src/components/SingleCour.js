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

    render() {
        const {coursId} = this.state;
        const { isAuthenticated} = this.props.auth;

        const editLinkGuest = (
            <div>
                <NavLink to={`/cours/edit/${coursId._id}`} className="btn btn-primary">Edit</NavLink>
                &nbsp;
                <a href={`/cours/delete/${coursId._id}`} className="btn btn-danger">Delete</a>
            </div>
        )
        return (
        <div className="container">
        <br/>
            <h1>{coursId.title}</h1>
            <br/>
            <h3>Ecrit par {coursId.author}</h3>
            <br/>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam sapiente sequi modi tenetur enim cupiditate earum ut, maxime ea voluptatum officia nisi provident architecto sed eos natus quod doloremque corrupti.
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos aperiam quibusdam consectetur! Quidem repudiandae dolor optio? Alias, voluptate? Obcaecati reiciendis maxime sunt vel eaque illo laboriosam facere sapiente tenetur molestias.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum molestias enim voluptatum est commodi similique, sapiente consequatur hic eaque eligendi quo repellendus nemo animi ratione facere, itaque nulla rerum dolorum.
            </p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam sapiente sequi modi tenetur enim cupiditate earum ut, maxime ea voluptatum officia nisi provident architecto sed eos natus quod doloremque corrupti.
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos aperiam quibusdam consectetur! Quidem repudiandae dolor optio? Alias, voluptate? Obcaecati reiciendis maxime sunt vel eaque illo laboriosam facere sapiente tenetur molestias.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum molestias enim voluptatum est commodi similique, sapiente consequatur hic eaque eligendi quo repellendus nemo animi ratione facere, itaque nulla rerum dolorum.
            </p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam sapiente sequi modi tenetur enim cupiditate earum ut, maxime ea voluptatum officia nisi provident architecto sed eos natus quod doloremque corrupti.
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos aperiam quibusdam consectetur! Quidem repudiandae dolor optio? Alias, voluptate? Obcaecati reiciendis maxime sunt vel eaque illo laboriosam facere sapiente tenetur molestias.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum molestias enim voluptatum est commodi similique, sapiente consequatur hic eaque eligendi quo repellendus nemo animi ratione facere, itaque nulla rerum dolorum.
            </p>
            {isAuthenticated ? editLinkGuest : null}
            
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
  })

export default  connect(mapStateToProps, null)(SingleCour);
