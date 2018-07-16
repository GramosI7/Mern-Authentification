import React, { Component } from 'react';
import { connect } from "react-redux";
import classnames from "classnames";
import { loginUser } from "../actions/authActions";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push("/cours")
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push("/")
    }

    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  handleOnSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(newUser);
  }


  handleOnChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render() {
    const { errors } = this.state;

    return (
        <form onSubmit={this.handleOnSubmit} className="container">
        <h1>Login</h1>
        <div className="form-group">
          <label >Email address</label>
          <input name="email" type="email" className={classnames("form-control", {"is-invalid" : errors.email})}  placeholder="Enter email" onChange={this.handleOnChange} value={this.state.email}/>
          {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input name="password" type="password" className={classnames("form-control", {"is-invalid" : errors.password})} placeholder="Password" onChange={this.handleOnChange} value={this.state.password}/>
          {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
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

export default connect(mapStateToProps, { loginUser })(Login);