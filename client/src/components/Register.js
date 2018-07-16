import React, { Component } from 'react';
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";


class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push("/cours")
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name : this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    this.props.registerUser(newUser, this.props.history)
  }

  render() {
    const { errors } = this.state;
    // const { user } = this.props.auth;
    return (
      <form onSubmit={this.handleOnSubmit} className="container">
      {/* {user ? user.name : null} */}
      <h1>Register</h1>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input name="name" type="text" className={classnames("form-control", {"is-invalid" : errors.name})} placeholder="Name" onChange={this.handleOnChange} value={this.state.name} />
          {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input name="email" type="email" className={classnames("form-control", {"is-invalid" : errors.email})} placeholder="Email" onChange={this.handleOnChange} value={this.state.email} />
          {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input name="password" type="password" className={classnames("form-control", {"is-invalid" : errors.password})} placeholder="Password" onChange={this.handleOnChange} value={this.state.password} />
          {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input name="password2" type="password" className={classnames("form-control", {"is-invalid" : errors.password2})} placeholder="Confirm Password" onChange={this.handleOnChange} value={this.state.password2} />
          {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));