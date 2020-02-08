import React, { Component } from "react";
import axios from "axios";

class Registration extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    registrationErrors: ""
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
    const { name, email, password, password_confirmation } = this.state;
    axios
      .post(
        "http://localhost:3000/registrations",
        {
          user: {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        this.setState({ registrationErrors: error });
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />

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

          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm password"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Registration;
