import React from "react";
import {NavLink} from 'react-router-dom';
import { connect } from "react-redux";
// actions
import { logoutUser } from "../actions/authActions";


class Navbar extends React.Component {

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    

    const authLinks = (
      <ul className="navbar-nav mr-rigth mt-2 mt-lg-0">
      <li className="nav-item active">
        <a href="" onClick={this.onLogoutClick} className="nav-link">
          <img style={{width: "25px", marginRight: "10px"}} className="rounded-circle" src={user.avatar} alt={user.avatar}/>
          Logout
        </a>
      </li>
    </ul>
    )


    const guestLinks = (
      <ul className="navbar-nav mr-rigth mt-2 mt-lg-0">
      <li className="nav-item active">
        <NavLink to="/login" className="nav-link">Login</NavLink><span className="sr-only">(current)</span>
      </li>
      <li className="nav-item active">
        <NavLink className="nav-link" to="/register">Register</NavLink><span className="sr-only">(current)</span>
      </li>
    </ul>
    )

    
    const addCoursLink = (
      <li className="nav-item active">
      <NavLink className="nav-link" to="/add">Add Cours</NavLink><span className="sr-only">(current)</span>
    </li>
    )

    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse container" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <NavLink to="/" className="nav-link">Home</NavLink><span className="sr-only">(current)</span>
            </li>
            <li className="nav-item active">
              <NavLink className="nav-link" to="/cours">Cours</NavLink><span className="sr-only">(current)</span>
            </li>
            {isAuthenticated ? addCoursLink : null}
          </ul>

          <form className="form-inline">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0">Search</button>
          </form>

        </div>
        {/* connecter ou non  */}
        {isAuthenticated ? authLinks : guestLinks}
       
      </nav>
  )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Navbar);