import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",
    LoginErrors: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    this.postUserData();
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  postUserData = () => {
    const { email, password } = this.state;
    axios
      .post(
        "http://localhost:3000/sessions",
        {
          user: {
            email: email,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.logged_in === true) {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        this.setState({ LoginErrors: error });
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;
