import React, { Component } from 'react';
import axios from "axios";
import {NavLink} from 'react-router-dom';


class Home extends Component {

    state = {
        movie: [],
        plus: 4
    }


    componentDidMount() {
        axios.get("/cours")
        .then((response) => {
            console.log(response);
            this.setState({
                movie : response.data
            }, () => console.log("state ! " ,this.state.movie))
          })
          .catch((error) => {
            console.log(error);
          })        
    }

    clickMore = () => {
        this.setState({
            plus: this.state.plus +2
        })
    }

  render() {
    return (
      <div className="container text-center">
      <br/>
        <h1>Page Home</h1>
        <br/>
            {this.state.movie.map((element, index) => {
                return (
                    <div key={index} className="card mb-3">
                        {/* <img className="card-img-top" style={{height : "200px"}} src={`./uploads/${element.img}`} alt=""/> */}
                        <div className="card-body">
                            <h5 className="card-title">{element.title}</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                        <NavLink className="btn btn-primary" to={`/cours/${element._id}`}>Voir plus</NavLink>                    </div>
                )
            }).slice(0,this.state.plus)}
            <button className="btn btn-primary" onClick={this.clickMore}>Voir plus d'articles</button>
        </div>
        

    )
  }
}

export default Home;
