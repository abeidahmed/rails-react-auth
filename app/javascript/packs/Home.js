import React, { Component } from "react";
import axios from "axios";
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";

class Home extends Component {
  handleSuccessfulAuth = data => {
    this.props.handleLogin(data);
    this.props.history.push("/contact");
  };

  handleLogOutClick = () => {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then(response => {
        this.props.handleLogOut();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h1>{this.props.loggedInStatus}</h1>
        <button onClick={this.handleLogOutClick}>Log Out</button>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    );
  }
}

export default Home;
